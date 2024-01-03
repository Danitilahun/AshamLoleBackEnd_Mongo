const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to the database");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });

  // Return the Mongoose connection instance
  return mongoose.connection;
};

module.exports = connectToDB;
