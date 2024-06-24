const User = require('../models/user');

let getUsersByRole = async (req, res, next) => {
    let role = req.params.role;
    let Teachers = await User.findAll({
        where:{
            role: role
        },
        attributes:['user_id','email','name','phone','role']
    });
    return res.send({
        status: 'success',
        data:Teachers
    });
}

module.exports = {
    getUsersByRole
};
