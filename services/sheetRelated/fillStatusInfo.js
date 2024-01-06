const Branch = require("../../models/branchRelatedSchema/branchSchema");
const Status = require("../../models/statusSchema");

async function fillStatusInfo(branchId, session) {
  try {
    const branch = await Branch.findById(branchId).session(session);

    if (!branch) {
      throw new Error("Branch not found");
    }

    const {
      ethioTelAccount,
      ethioTelBill,
      ethioTelOwnerName,
      houseRent,
      houseRentAccount,
      houseRentOwnerName,
      taxPercentage,
      wifi,
      wifiAccount,
      wifiOwnerName,
      expenseOneName,
      expenseOneAmount,
      expenseTwoName,
      expenseTwoAmount,
      expenseThreeName,
      expenseThreeAmount,
    } = branch;

    const newStatus = new Status({
      branchId: branchId,
      ethioTelAccount: ethioTelAccount,
      ethioTelBill: ethioTelBill,
      ethioTelOwnerName: ethioTelOwnerName,
      houseRent: houseRent,
      houseRentAccount: houseRentAccount,
      houseRentOwnerName: houseRentOwnerName,
      taxPercentage: taxPercentage,
      wifi: wifi,
      wifiAccount: wifiAccount,
      wifiOwnerName: wifiOwnerName,
      others: [
        { name: expenseOneName, amount: expenseOneAmount },
        { name: expenseTwoName, amount: expenseTwoAmount },
        { name: expenseThreeName, amount: expenseThreeAmount },
      ],
    });

    await newStatus.save({ session });
    return { success: true, message: "Status information filled successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = fillStatusInfo;
