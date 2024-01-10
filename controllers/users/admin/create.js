const Admin = require("../../../models/user/adminSchema");

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const {
      sheetId,
      bankAccount,
      branchId,
      branchName,
      difference,
      disable,
      email,
      fullAddress,
      fullName,
      phone,
      profileImage,
      salary,
      securityAddress,
      securityName,
      securityPhone,
      uniqueName,
    } = req.body;

    const newAdmin = new Admin({
      sheetId,
      bankAccount,
      branchId,
      branchName,
      difference,
      disable,
      email,
      fullAddress,
      fullName,
      phone,
      profileImage,
      salary,
      securityAddress,
      securityName,
      securityPhone,
      uniqueName,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
