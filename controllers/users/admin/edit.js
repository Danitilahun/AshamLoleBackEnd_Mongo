const mongoose = require("mongoose");
const Admin = require("../../../models/user/adminSchema");
const updateAshamStaffByWorkerId = require("../../../services/users/updateAshamStaffByWorkerId");
const updateBranchFields = require("../../../services/branchRelated/updateBranchFields");
const updateEssentialFields = require("../../../services/users/updateEssentialFields");
const { getIoInstance } = require("../../../socket");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Edit an existing admin
const editAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const { id } = req.params;
    const data = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });

    if (!updatedAdmin) {
      throw new Error("Admin not found");
    }

    await updateAshamStaffByWorkerId(
      id,
      {
        name: updatedAdmin.fullName,
      },
      session
    );

    await updateBranchFields(
      updatedAdmin.branchId,
      {
        managerName: updatedAdmin.fullName,
      },
      session
    );

    await updateEssentialFields(
      updatedAdmin.essentialId,
      {
        name: updatedAdmin.fullName,
        address: updatedAdmin.fullAddress,
        phone: updatedAdmin.phone,
      },
      session
    );

    console.log("updatedAdmin", updatedAdmin);
    const branch = await Branch.findById(updatedAdmin.branchId).session(
      session
    );
    console.log("branch", branch, {
      branchName: branch.name,
      ...updatedAdmin._doc,
    });
    io.emit("adminUpdated", {
      branchName: branch.name,
      ...updatedAdmin._doc,
    });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = editAdmin;
