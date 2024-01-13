const Asbeza = require("../../../models/service/asbezaSchema");
const Card = require("../../../models/service/cardSchema");
const Water = require("../../../models/service/waterSchema");
const Wifi = require("../../../models/service/wifiSchema");
const updateDocumentsStatusByCriteria = require("../../../services/users/deleteDocumentsByCriteria");

const completeTask = async (req, res) => {
  const {
    branchId,
    deliveryguyId,
    date,
    active,
    activeTable,
    activeDailySummery,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const AsbezaCount = await updateDocumentsStatusByCriteria(
      Asbeza,
      {
        branchId,
        deliveryguyId,
        date,
        status: "Assigned",
      },
      session
    );
    const CardCount = await updateDocumentsStatusByCriteria(
      Card,
      {
        branchId,
        deliveryguyId,
        date,
        status: "Assigned",
      },
      session
    );
    const WaterCount = await updateDocumentsStatusByCriteria(
      Water,
      {
        branchId,
        deliveryguyId,
        date,
        status: "Assigned",
      },
      session
    );
    const WifiCount = await updateDocumentsStatusByCriteria(
      Wifi,
      {
        branchId,
        deliveryguyId,
        date,
        status: "Assigned",
      },
      session
    );

    const total = AsbezaCount + CardCount + WaterCount + WifiCount;

    if (total == 0) {
      return res.status(200).json({
        message:
          "The delivery guy does not have any assigned tasks. Any orders that were assigned to them have either been completed or are new orders that have not yet been assigned.",
      });
    }

    const result = await payDeliveryGuy(
      db,
      {
        active: active,
        branchId: branchId,
        deliveryguyId: deliveryguyId,
      },
      batch,
      AsbezaCount,
      CardCount,
      WifiCount,
      WaterCount
    );
    const totalExp = result[0];
    const oldSalary = result[1];
    const companyGain = await getSingleDocFromCollection("companyGain");

    if (!companyGain) {
      return res.status(404).json({
        message: "Company gain not found",
        type: "info",
      });
    }

    const NOA = AsbezaCount;
    // First update: Change the daily table
    await updateTable(
      db,
      "tables",
      activeTable,
      deliveryguyId,
      "total",
      {
        asbezaNumber: parseInt(AsbezaCount),
        cardCollect: parseInt(CardCount),
        waterCollect: parseInt(WaterCount),
        wifiCollect: parseInt(WifiCount),
        asbezaProfit: parseInt(NOA) * companyGain.asbeza_profit,
        total: parseInt(NOA) * companyGain.asbeza_profit,
      },
      batch
    );

    // Second update: Change the 15 days summery and daily summery tables
    await updateTable(
      db,
      "tables",
      activeDailySummery,
      date,
      "total",
      {
        asbezaNumber: parseInt(AsbezaCount),
        cardCollect: parseInt(CardCount),
        waterCollect: parseInt(WaterCount),
        wifiCollect: parseInt(WifiCount),
        asbezaProfit: parseInt(NOA) * companyGain.asbeza_profit,
        total: parseInt(NOA) * companyGain.asbeza_profit,
      },
      batch
    );

    // Third update: Individual person's daily work summery
    const newIncome = await updateTable(
      db,
      "tables",
      active,
      deliveryguyId,
      "total",
      {
        asbezaNumber: parseInt(AsbezaCount),
        cardCollect: parseInt(CardCount),
        waterCollect: parseInt(WaterCount),
        wifiCollect: parseInt(WifiCount),
        asbezaProfit: parseInt(NOA) * companyGain.asbeza_profit,
        total: parseInt(NOA) * companyGain.asbeza_profit,
      },
      batch
    );

    // Check if 'newIncome' is null
    if (!newIncome) {
      return res.status(500).json({
        message: "Failed to update income",
        type: "error",
      });
    }

    // Updating sheet status with totalDeliveryGuySalary
    const newStatus = await updateSheetStatus(
      db,
      batch,
      active,
      "totalDeliveryGuySalary",
      totalExp + oldSalary,
      newIncome.total.total + parseInt(NOA) * companyGain.asbeza_profit
    );

    // Check if 'newStatus' is null
    // console.log(newStatus);
    if (!newStatus) {
      return res.status(500).json({
        message: "Failed to update sheet status",
        type: "error",
      });
    }

    // Updating dashboard with newIncome and newSalaryExpense details
    await updateDashboard(
      db,
      batch,
      branchId,
      newStatus.totalIncome,
      newStatus.totalExpense,
      parseInt(NOA) * companyGain.asbeza_profit
    );

    // Updating dashboard branch information
    await updateDashboardBranchInfo(
      db,
      batch,
      branchId,
      newStatus.totalIncome,
      newStatus.totalExpense,
      newIncome.total.asbezaProfit + parseInt(NOA) * companyGain.asbeza_profit
    );

    // await updateCalculatorAmount(db, batch, active, newStatus.totalIncome);

    // Commit the batch updates
    await batch.commit();

    res.status(200).json({ message: "Task completed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = completeTask;
