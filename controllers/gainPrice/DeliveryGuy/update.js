const DeliveryGuyGain = require("./path_to_your_DeliveryGuyGain_model");

const updateDeliveryGuyGainField = async (req, res) => {
  try {
    const { fieldName, fieldValue } = req.body;

    if (!fieldName || !fieldValue) {
      return res
        .status(400)
        .json({ message: "Please provide both field name and value." });
    }

    const existingGain = await DeliveryGuyGain.findOne();

    if (!existingGain) {
      return res.status(404).json({ message: "DeliveryGuyGain not found." });
    }

    if (existingGain[fieldName] === undefined) {
      return res
        .status(400)
        .json({ message: "Field does not exist in DeliveryGuyGain." });
    }

    existingGain[fieldName] = fieldValue;
    await existingGain.save();

    res
      .status(200)
      .json({
        message: `Field '${fieldName}' updated successfully`,
        existingGain,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateDeliveryGuyGainField };
