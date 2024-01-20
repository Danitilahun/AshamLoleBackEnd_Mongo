const CallCenter = require("../../../models/user/callCenterSchema");
const updateAshamStaffByWorkerId = require("../../../services/users/updateAshamStaffByWorkerId");
const updateEssentialFields = require("../../../services/users/updateEssentialFields");

// Edit an existing call center employee
const editCallCenterEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCallCenterEmployee = await CallCenter.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    await updateEssentialFields(
      updatedCallCenterEmployee.essentialId,
      {
        name: updatedCallCenterEmployee.fullName,
        address: updatedCallCenterEmployee.fullAddress,
        phone: updatedCallCenterEmployee.phone,
      },
      session
    );

    await updateAshamStaffByWorkerId(
      id,
      {
        name: updatedCallCenterEmployee.fullName,
      },
      session
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
