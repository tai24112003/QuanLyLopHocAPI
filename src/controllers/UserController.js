const User = require('../models/user');

let getUsersByRole = async (req, res, next) => {
    let role = req.params.role;
    let Teachers = await User.findAll({
        where:{
            role: role
        }
    });
    return res.send({data:Teachers});
}

module.exports = {
    getUsersByRole
};
