const User = require("../models/user");
const {
  sendSuccessResponse,
  sendInternalErrorResponse,
} = require("../ultis/response");

let getUsersByRole = async (req, res, next) => {
  let role = req.params.role;
  let Teachers = await User.findAll({
    where: {
      role: role,
    },
    attributes: ["user_id", "email", "name", "phone", "role"],
  });
  return res.send({
    status: "success",
    data: Teachers,
  });
};

let getUser = async (req, res, next) => {
  try {
    let id = req.user.id;
    let Teachers = await User.findAll({
      where: {
        user_id: id,
      },
      attributes: ["user_id", "email", "name", "phone", "role"],
    });

    if (!Teachers) {
      return sendErrorResponse(res, "User not found", 404);
    }

    return res.send({
      status: "success",
      data: Teachers,
    });
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
};

let getAllUser = async (req, res, next) => {
  try {
    let Teachers = await User.findAll({
      attributes: ["user_id", "email", "name", "phone", "role"],
    });

    if (!Teachers) {
      return sendErrorResponse(res, "User not found", 404);
    }

    return sendSuccessResponse(res, Teachers);
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
};

module.exports = {
  getUsersByRole,
  getUser,
  getAllUser,
};
