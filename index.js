const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandler");
const testRoutes = require("./routes/v1/test.route");

app.use(
  cors({
    origin: "*", // or '*' for any origin
    credentials: true, // if you need to include cookies in the request
  })
);
app.use(express.json());
app.use(express.static("front"));
app.use(express.urlencoded({ extended: true }));
const { setupSocket } = require("./socketSetup");

const server = http.createServer(app);

const notificationsRoutes = require("./routes/v1/notifications.route");
const announcementsRoutes = require("./routes/v1/announcements.route");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(cors());
app.use(express.json());
app.use(express.static("front"));

// Error handler middleware
app.use(errorHandler);

// Attach your routes after the error handler
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/notifications", notificationsRoutes);
app.use("/api/v1/announcements", announcementsRoutes);

app.get("/", (req, res) => {
  res.send("Experiment Labs server is running");
});

app.all("*", (req, res) => {
  res.send("No route found.");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

setupSocket(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
