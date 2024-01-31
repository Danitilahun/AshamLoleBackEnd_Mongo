const { Server } = require("socket.io");
const getAllBranches = require("./events/getAllBranches");
const getAllAdmins = require("./events/getAllAdmins");
const getAllCallCenters = require("./events/getAllCallCenters");
const getAllDeliveryGuys = require("./events/getAllDeliveryGuys");
const getAllFinances = require("./events/getAllFinances");
const getAllStaffMembers = require("./events/getAllStaffMembers");
const getAllSheets = require("./events/getAllSheets");
const getDailyTableDetails = require("./events/getDailyTableDetails");
const getFifteenDayWorkSummary = require("./events/getFifteenDayWorkSummary");
const getDeliveryGuyWorkSummary = require("./events/getDeliveryGuyWorkSummary");

let io;

const setupSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("getAllBranches", () => getAllBranches(socket));
    socket.on("getAllAdmins", () => getAllAdmins(socket));
    socket.on("getAllCallCenters", () => getAllCallCenters(socket));
    socket.on("getAllFinances", () => getAllFinances(socket));

    socket.on("getAllDeliveryGuys", (branchId) =>
      getAllDeliveryGuys(socket, branchId)
    );
    socket.on("getAllSheets", (branchId) => getAllSheets(socket, branchId));
    socket.on("getAllStaffMembers", (branchId) =>
      getAllStaffMembers(socket, branchId)
    );

    socket.on("getFifteenDayWorkSummary", (tableId) =>
      getFifteenDayWorkSummary(socket, tableId)
    );
    socket.on("getDailyTableDetails", (id) => getDailyTableDetails(socket, id));
    socket.on("getDeliveryGuyWorkSummary", (tableId) =>
      getDeliveryGuyWorkSummary(socket, tableId)
    );

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};

const getIoInstance = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized. Call setupSocketIO first."
    );
  }

  return io;
};

module.exports = { setupSocketIO, getIoInstance };
