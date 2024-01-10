const Admin = require("../../../models/user/adminSchema");

// Delete an admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteAdmin;
