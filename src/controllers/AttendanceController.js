const Attendance = require('../models/attendance');

let getList = async (req, res, next) => {
    let Attendances = await Attendance.findAll();
    return res.send({ data: Attendances });
}

module.exports = {
    getList
};
