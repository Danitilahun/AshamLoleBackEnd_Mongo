const mongoose = require("mongoose");

const deliveryTurnSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    deliveryGuyTurnQueue: {
      type: [
        {
          deliveryGuyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryGuy",
          },
          name: String,
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
);

// Enqueue method to add a delivery guy's turn to the end of the queue
deliveryTurnSchema.methods.enqueue = function (deliveryGuyId, name) {
  this.deliveryGuyTurnQueue.push({ deliveryGuyId, name });
};

// Dequeue method to remove and return the first element from the queue
deliveryTurnSchema.methods.dequeue = function () {
  return this.deliveryGuyTurnQueue.shift();
};

const DeliveryTurn = mongoose.model("DeliveryTurn", deliveryTurnSchema);

module.exports = DeliveryTurn;
