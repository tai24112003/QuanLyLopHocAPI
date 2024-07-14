const { Sequelize } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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
  });
  return res.send({
    status: "success",
    data: Teachers,
  });
};
let getUserCanTeach = async (req, res, next) => {
  try {
    let rolesToInclude = ["PK", "TK", "GV"];

    let Teachers = await User.findAll({
      where: {
        role: {
          [Sequelize.Op.in]: rolesToInclude,
        },
      },
    });

    return res.send({
      status: "success1",
      data: Teachers,
    });
  } catch (error) {
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};

let getUser = async (req, res, next) => {
  try {
    let id = req.user.id;
    let Teachers = await User.findAll({
      where: {
        id: id,
      },
      attributes: ["id", "email", "name", "phone", "role", "status"],
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
      attributes: ["id", "email", "name", "phone", "role", "status"],
    });

    if (!Teachers) {
      return sendErrorResponse(res, "User not found", 404);
    }

    return sendSuccessResponse(res, Teachers);
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
};

let addUser = async (req, res, next) => {
  try {
    let { email, name, phone, role, password } = req.body;

    if (!email || !name || !phone || !role || !password) {
      return res.status(400).send({
        status: "error",
        message: "Missing required fields",
      });
    }

    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({
        status: "error",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      email,
      name,
      phone,
      role,
      password: hashedPassword, // Ensure this is hashed before saving
    });

    newUser = newUser.toJSON();
    delete newUser.password;

    return sendSuccessResponse(res, newUser);
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
};

let updateUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let { email, name, phone, role, password } = req.body;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    if (email) {
      let existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id != id) {
        console.log(id);
        console.log(existingUser.id);
        return res.status(400).send({
          status: "error",
          message: "Email already exists",
        });
      }
    }

    user.email = email || user.email;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.role = role || user.role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword; // Ensure this is hashed before saving
    }

    await user.save();

    user = user.toJSON();
    delete user.password;
    return sendSuccessResponse(res, user);
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
};

let toggleUserStatus = async (req, res, next) => {
  try {
    let id = req.params.id;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    // Toggle the status
    user.status = user.status === null ? 1 : null;

    await user.save();

    user = user.toJSON();
    delete user.password;
    return sendSuccessResponse(res, { ...user, password: "" });
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
};

module.exports = {
  getUsersByRole,
  getUser,
  getAllUser,
  getUserCanTeach,
  addUser,
  updateUser,
  toggleUserStatus,
};
