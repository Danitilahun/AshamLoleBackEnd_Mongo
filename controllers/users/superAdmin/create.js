const mongoose = require("mongoose");
const Superadmin = require("../../../models/user/superadminSchema");
const createAshamStaff = require("../../../services/users/createAshamStaff");
const createEssential = require("../../../services/users/createEssential");

// Create a new superadmin
const createSuperadmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    data.role = process.env.SUPERADMIN;
    data.password = "12345678";

    const existingSuperadmin = await Superadmin.findOne({ email: data.email });

    if (existingSuperadmin) {
      throw new Error("User with the same email already exists");
    }

    const essential = await createEssential(session, {
      address: data.fullAddress,
      company: "AshamLole",
      name: data.fullName,
      phone: data.phone,
      sector: "Branch",
    });

    data.essentialId = essential._id;

    const newSuperadmin = new Superadmin(data);

    await createAshamStaff(session, {
      id: newSuperadmin._id,
      name: newSuperadmin.fullName,
      role: "Admin",
      branchId: "AshamLole",
    });

    const savedSuperadmin = await newSuperadmin.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedSuperadmin);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createSuperadmin;
