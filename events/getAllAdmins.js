const Branch = require("../models/branchRelatedSchema/branchSchema");
const Admin = require("../models/user/adminSchema");

const getAllAdmins = async (socket) => {
  try {
    const admins = await Admin.find();
    const adminData = await Promise.all(
      admins.map(async (admin) => {
        const branch = await Branch.findById(admin.branchId);
        const adminObject = admin.toObject();
        adminObject.branchName = branch ? branch.name : null;
        return adminObject;
      })
    );
    console.log(adminData);
    socket.emit("allAdminsData", { success: true, data: adminData });
  } catch (error) {
    socket.emit("allAdminsData", { success: false, error: error.message });
  }
};

module.exports = getAllAdmins;
