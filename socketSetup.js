// socketSetup.js
const socketIo = require("socket.io");

let io;

function setupSocket(server) {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://experiment-lab-db58b.web.app", // Add more frontend URLs here
    "https://experimentlabs.in",
  ];

  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("testing", (notification) => {
      console.log("Testing notification: " + notification);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

function getIo() {
  return io;
}

module.exports = { setupSocket, getIo };
