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

// Create a new admin
const createAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { sheetId, ...data } = req.body;

    data.salary = parseInt(data.salary);
    data.uniqueName = "admin";
    data.role = process.env.ADMIN;
    data.paid = true;
    data.password = "12345678";
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
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.username}, please click on the link to activate your account: ${activationUrl}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
    const savedAdmin = await newAdmin.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedAdmin);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
