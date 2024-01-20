const mongoose = require("mongoose");
const CallCenter = require("../../../models/user/callCenterSchema");
const createAshamStaff = require("../../../services/users/createAshamStaff");
const createEssential = require("../../../services/users/createEssential");

// Create a new call center employee
const createCallCenterEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    data.role = process.env.CALLCENTER;
    data.password = "12345678";

    const essential = await createEssential(session, {
      address: data.fullAddress,
      company: "AshamLole",
      name: data.fullName,
      phone: data.phone,
      sector: "Branch",
    });

    data.essentialId = essential._id;

    const newCallCenterEmployee = new CallCenter(data);

    await createAshamStaff(session, {
      id: newCallCenterEmployee._id,
      name: newCallCenterEmployee.name,
      role: "Admin",
      branchId: "AshamLole",
    });

    const savedCallCenterEmployee = await newCallCenterEmployee.save({
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedCallCenterEmployee);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCallCenterEmployee;
