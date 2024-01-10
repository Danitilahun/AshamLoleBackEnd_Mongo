const Staff = require("../../../models/staffSchema");

// Create a new staff member
const createStaffMember = async (req, res) => {
  try {
    const {
      bankAccount,
      branchId,
      fullAddress,
      fullName,
      paid,
      phone,
      profileImage,
      salary,
      securityAddress,
      securityName,
      securityPhone,
      uniqueName,
    } = req.body;

    const newStaffMember = new Staff({
      bankAccount,
      branchId,
      fullAddress,
      fullName,
      paid,
      phone,
      profileImage,
      salary,
      securityAddress,
      securityName,
      securityPhone,
      uniqueName,
    });

    const savedStaffMember = await newStaffMember.save();
    res.status(201).json(savedStaffMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createStaffMember;
