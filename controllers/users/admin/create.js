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
    const { tableId, ...data } = req.body;
    console.log("data", data);

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

    const newAdmin = new Admin(data);

    const id = newAdmin._id;
    const name = newAdmin.fullName;
    const branchId = newAdmin.branchId;

    await updateBranchManager(data.branchId, id, session);

    await createAshamStaff(session, {
      id: id,
      name: name,
      role: "Admin",
      branchId: branchId,
    });

    if (tableId) {
      await addNewStaffAndUpdateSalaryTable(tableId, id, session);
    }

    await increaseNumberOfWorker(branchId, session);

    const savedAdmin = await newAdmin.save({ session });
    console.log("newAdmin", savedAdmin);
    const branch = await Branch.findById(data.branchId);
    io.emit("adminCreated", { branchName: branch.name, ...savedAdmin._doc });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
