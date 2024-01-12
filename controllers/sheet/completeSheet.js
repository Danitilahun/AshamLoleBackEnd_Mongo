const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");

const ChangeSheetStatus = async (req, res) => {
  try {
    const data = req.body;

    const prevSheetCheckResult = await checkPreviousSheet(data.sheetId);
    if (prevSheetCheckResult) {
      return res.status(400).json(prevSheetCheckResult);
    }

    res.status(200).json({
      message: `Sheet status successfully changed to Completed.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = ChangeSheetStatus;
