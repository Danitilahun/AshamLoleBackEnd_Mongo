const CallCenter = require("../../../models/user/callCenterSchema");

// Edit an existing call center employee
const editCallCenterEmployee = async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedCallCenterEmployee = await CallCenter.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (!updatedCallCenterEmployee) {
      return res
        .status(404)
        .json({ message: "Call center employee not found" });
    }

    res.status(200).json(updatedCallCenterEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editCallCenterEmployee;
