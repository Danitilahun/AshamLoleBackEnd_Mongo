const mongoose = require("mongoose");
const Admin = require("../../../models/user/adminSchema");
const increaseNumberOfWorker = require("../../../services/branchRelated/increaseNumberOfWorker");

// Delete an admin
const deleteAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id).session(session);

    if (!deletedAdmin) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Admin not found" });
    }

    await increaseNumberOfWorker(data.branchId, session, -1);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteAdmin;
