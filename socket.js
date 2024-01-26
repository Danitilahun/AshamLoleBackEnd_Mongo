// setupSocketIO.js

const { Server } = require("socket.io");
const getSingleBranch = require("./events/getSingleBranch");
const getAllBranches = require("./events/getAllBranches");

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

    socket.on("getSingleBranch", (branchId) =>
      getSingleBranch(socket, branchId)
    );
    socket.on("getAllBranches", () => getAllBranches(socket));

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
