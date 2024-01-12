const CardFee = async (data, session) => {
  try {
    // First update: Update the "tables" collection with cardFee: 1
    await updateTable(
      db,
      "tables",
      data.activeTable,
      data.deliveryguyId,
      "total",
      {
        cardFee: 1,
      },
      batch
    );

    // Second update: Change the 15 days summary and daily summary tables
    await updateTable(
      db,
      "tables",
      data.activeDailySummery,
      data.date,
      "total",
      {
        cardFee: 1,
      },
      batch
    );

    // Third update: Individual person's daily work summary
    await updateTable(
      db,
      "tables",
      data.active,
      data.deliveryguyId,
      "total",
      {
        cardFee: 1,
      },
      batch
    );

    // Update the total credit by subtracting the deleted credit amount
    const dailyCreditTotalId = generateCustomID(`${data.branchId}-daily`);

    const updatedTotalCredit = await updateCreditDocument(
      dailyCreditTotalId,
      "dailyCreditTotal",
      -parseFloat(data ? data.price : 0), // Subtract the deleted credit amount
      db,
      batch
    );

    // // Update the calculator with the new total credit
    // if (updatedTotalCredit) {
    //   await updateCalculator(
    //     data.active,
    //     parseFloat(updatedTotalCredit.total ? updatedTotalCredit.total : 0),
    //     db,
    //     batch
    //   );
    // }
  } catch (error) {
    console.error("Error in updateDeliveryAndDashboard:", error);
    throw error;
  }
};

module.exports = CardFee;
