const Staff = require("../models/staffSchema");

const getAllStaffMembers = async (socket, branchId) => {
  try {
    const staffMembers = await Staff.find({ branchId });
    socket.emit("allStaffMembersData", { success: true, data: staffMembers });
  } catch (error) {
    socket.emit("allStaffMembersData", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getAllStaffMembers;
