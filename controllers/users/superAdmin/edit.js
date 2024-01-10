const Superadmin = require("../../../models/user/superadminSchema");

// Edit an existing superadmin
const editSuperadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updatedSuperadmin = await Superadmin.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedSuperadmin) {
      return res.status(404).json({ message: "Superadmin not found" });
    }

    res.status(200).json(updatedSuperadmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editSuperadmin;
