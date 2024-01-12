const {
  DailyGainCredit,
  DailyExpenseCredit,
  DailyCredit,
} = require("../../models/credit/dailyCreditSchema");
const StaffCredit = require("../../models/credit/staffCreditSchema");
const Bonus = require("../../models/incentive/bonusSchema");
const Penalty = require("../../models/incentive/penaltySchema");
const CardDistribute = require("../../models/report/cardDistributeSchema");
const CardFee = require("../../models/report/cardFeeSchema");
const HotelProfit = require("../../models/report/hotelProfitSchema");
const WaterDistribute = require("../../models/report/waterDistributeSchema");
const WifiDistribute = require("../../models/report/wifiDistributeSchema");
/**
 * Delete sheet-related documents (Penalties, Bonuses, etc.) associated with a given branchId within a transaction.
 *
 * @param {string} branchId - The ID of the branch for which sheet-related documents should be deleted.
 * @param {object} session - The Mongoose transaction session.
 * @returns {object} - Object with a success message upon successful deletion.
 * @throws {Error} - If there's an error during the deletion process.
 */
const deleteSheetRelatedDocumentsByBranchId = async (branchId, session) => {
  try {
    // Delete staffCredits from DailyCredit collection
    await DailyCredit.deleteMany({ branchId, source: "staffCredit" }).session(
      session
    );

    // Delete staffCredits from DailyExpenseCredit collection
    await DailyExpenseCredit.deleteMany({ branchId }).session(session);

    // Delete staffCredits from DailyGainCredit collection
    await DailyGainCredit.deleteMany({
      branchId,
      source: "staffCredit",
    }).session(session);

    await StaffCredit.deleteMany({ branchId }).session(session);
    // Delete penalties with the given branchId
    await Penalty.deleteMany({ branchId }).session(session);
    // Delete bonuses with the given branchId
    await Bonus.deleteMany({ branchId }).session(session);
    // Delete cardDistribute with the given branchId
    await CardDistribute.deleteMany({ branchId }).session(session);
    // Delete cardFee with the given branchId
    await CardFee.deleteMany({ branchId }).session(session);
    // Delete hotelProfit with the given branchId
    await HotelProfit.deleteMany({ branchId }).session(session);
    // Delete waterDistribute with the given branchId
    await WaterDistribute.deleteMany({ branchId }).session(session);
    // Delete wifiDistribute with the given branchId
    await WifiDistribute.deleteMany({ branchId }).session(session);

    return { message: "Sheet-related documents deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting sheet-related documents: ${error.message}`);
  }
};

module.exports = deleteSheetRelatedDocumentsByBranchId;
