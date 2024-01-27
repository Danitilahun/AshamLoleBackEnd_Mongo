const Staff = require("../models/staffSchema");

const getAllStaffMembers = async (socket) => {
  try {
    const staffMembers = await Staff.find();
    socket.emit("allStaffMembersData", { success: true, data: staffMembers });
  } catch (error) {
    socket.emit("allStaffMembersData", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getAllStaffMembers;
