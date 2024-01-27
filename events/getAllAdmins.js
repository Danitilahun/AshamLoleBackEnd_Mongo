const Admin = require("../models/user/adminSchema");

const getAllAdmins = async (socket) => {
  try {
    const admins = await Admin.find();
    socket.emit("allAdminsData", { success: true, data: admins });
  } catch (error) {
    socket.emit("allAdminsData", { success: false, error: error.message });
  }
};

module.exports = getAllAdmins;
