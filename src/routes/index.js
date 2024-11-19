const express = require("express");

const adminRouter = require("./admin");
const Class = require("./class");
const class_student = require("./class_student");
const student = require("./student");
const user = require("./user");
const setting = require("./setting");
const computer = require("./computer");
const class_sessions = require("./class_session");
const session_computer = require("./session_computer");
const attendance = require("./attendance");
const room = require("./room");
const asset = require("./asset");
const auth = require("./auth");
const session = require("./session");
const authenticateToken = require("../midlewares/verifyToken");

function setRoute(server) {
  server.use("/api/user", user);

  server.use("/api/setting", setting);

  server.use("/api/computer", computer);

  server.use("/api/class_session", class_sessions);

  server.use("/api/session_computer", session_computer);

  server.use("/api/room", room);

  server.use("/api/upload", authenticateToken, asset);

  server.use("/api/class", Class);

  server.use("/api/session", session);

  server.use("/api/student", student);

  server.use("/api/class_student", class_student);

  server.use("/api/attendance", attendance);

  server.use("/api/auth", auth);
}

module.exports = setRoute;
