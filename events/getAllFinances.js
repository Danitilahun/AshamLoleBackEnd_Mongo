const Finance = require("../models/user/financeschema");

const getAllFinances = async (socket) => {
  try {
    const finances = await Finance.find();
    socket.emit("allFinancesData", { success: true, data: finances });
  } catch (error) {
    socket.emit("allFinancesData", { success: false, error: error.message });
  }
};

module.exports = getAllFinances;
