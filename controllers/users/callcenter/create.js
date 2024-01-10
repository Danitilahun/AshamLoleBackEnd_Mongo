const CallCenter = require("../../../models/user/callCenterSchema");

// Create a new call center employee
const createCallCenterEmployee = async (req, res) => {
  try {
    const {
      bankAccount,
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
    } = req.body;

    const newCallCenterEmployee = new CallCenter({
      bankAccount,
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
    });

    const savedCallCenterEmployee = await newCallCenterEmployee.save();
    res.status(201).json(savedCallCenterEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createCallCenterEmployee;
