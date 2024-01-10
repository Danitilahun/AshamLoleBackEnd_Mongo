const Admin = require("../../../models/user/adminSchema");

// Edit an existing admin
const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editAdmin;
