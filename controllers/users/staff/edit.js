const Staff = require("../../../models/staffSchema");

// Edit an existing staff member
const editStaffMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updatedStaffMember = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedStaffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    res.status(200).json(updatedStaffMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editStaffMember;
