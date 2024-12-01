const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load biến môi trường từ file .env

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Token Required" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Access Token" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
