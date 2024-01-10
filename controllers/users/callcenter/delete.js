const CallCenter = require("../../../models/user/callCenterSchema");

// Delete a call center employee
const deleteCallCenterEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCallCenterEmployee = await CallCenter.findByIdAndDelete(id);

    if (!deletedCallCenterEmployee) {
      return res
        .status(404)
        .json({ message: "Call center employee not found" });
    }

    res
      .status(200)
      .json({ message: "Call center employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCallCenterEmployee;
