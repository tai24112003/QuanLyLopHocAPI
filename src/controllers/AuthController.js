const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  sendSuccessResponse,
  sendInternalErrorResponse,
  sendErrorResponse,
} = require("../ultis/response");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, status: null } });

    if (!user) {
      return sendErrorResponse(
        res,
        "Tên đăng nhập hoặc mật khẩu không đúng",
        401
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendErrorResponse(
        res,
        "Tên đăng nhập hoặc mật khẩu không đúng",
        401
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.name, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "48h" }
    );

    return sendSuccessResponse(res, { token });
  } catch (error) {
    console.error("Error:", error);
    return sendInternalErrorResponse(res);
  }
};

module.exports = {
  login,
};
