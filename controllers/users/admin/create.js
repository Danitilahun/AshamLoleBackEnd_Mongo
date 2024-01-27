const Admin = require("../../../models/user/adminSchema");
const mongoose = require("mongoose");
const updateBranchManager = require("../../../services/branchRelated/updateBranchManager");
const createAshamStaff = require("../../../services/users/createAshamStaff");
const addNewStaffAndUpdateSalaryTable = require("../../../services/sheetRelated/create/addNewStaffAndUpdateSalaryTable");
const createEssential = require("../../../services/users/createEssential");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");
const increaseNumberOfWorker = require("../../../services/branchRelated/increaseNumberOfWorker");
const createStaff = require("../../../services/users/createStaff");
const createActivationToken = require("../../../util/createActivationToken");
const sendMail = require("../../../util/sendMail");
const { getIoInstance } = require("../../../socket");

// Create a new admin
const createAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const { sheetId, ...data } = req.body;

    data.salary = parseInt(data.salary);
    data.uniqueName = "admin";
    data.paid = true;
    data.password = "Asham123!";
    data.staffCredit = 0;

    const newStaff = await createStaff(session, data);

    const newEssential = await createEssential(session, {
      address: data.fullAddress,
      company: "AshamLole",
      name: data.fullName,
      phone: data.phone,
      sector: "Branch",
    });

    data.essentialId = newEssential._id;
    data.staffId = newStaff._id;

    const newAdmin = new Admin.create([data], { session });

    await updateBranchManager(
      data.branchId,
      newAdmin._id,
      newAdmin.name,
      session
    );

    await createAshamStaff(session, {
      id: newAdmin._id,
      name: newAdmin.name,
      role: "Admin",
      branchId: newAdmin.branchId,
    });

    if (sheetId) {
      const branch = await Branch.findOne({ _id: data.branchId });

      if (!branch) {
        throw new Error("Branch not found");
      }
      await addNewStaffAndUpdateSalaryTable(
        data.branchId,
        branch.activeSheet,
        newAdmin._id,
        session
      );
    }

    await increaseNumberOfWorker(data.branchId, session);

    const activationToken = createActivationToken({
      id: newAdmin._id,
      role: newAdmin.role,
    });

    const activationUrl = `http://localhost:3000/${activationToken}`;

    try {
      await sendMail({
        email: newAdmin.email,
        subject: "Activate your account",
        message: `Hello ${newAdmin.fullName}, please click on the link to activate your account: ${activationUrl}`,
      });
    } catch (error) {
      throw new Error("Email could not be sent");
    }
    const savedAdmin = await newAdmin.save({ session });
    console.log(savedAdmin);
    io.emit("adminCreated", savedAdmin);
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
