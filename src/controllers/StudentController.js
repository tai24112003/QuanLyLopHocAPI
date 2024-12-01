const Student = require("../models/student"); // Import your SessionComputer model
const { Op, Sequelize } = require("sequelize");
// Endpoint to insert students
const Setting = require("../models/setting"); // Điều chỉnh đường dẫn nếu cần

const insert = async (req, res) => {
  try {
    const students = req.body;
    let latestTime = null; // Biến để lưu trữ LastTime mới nhất

    // Duyệt qua từng sinh viên và chèn hoặc cập nhật thông tin vào cơ sở dữ liệu
    for (const student of students) {
      const existingStudent = await Student.findOne({
        where: { StudentID: student.StudentID },
      });

      if (existingStudent) {
        // Nếu StudentID đã tồn tại, cập nhật thông tin học sinh
        await existingStudent.update({
          FirstName: student.FirstName,
          LastName: student.LastName,
          LastTime: student.LastTime,
        });
      } else {
        // Nếu StudentID chưa tồn tại, thêm mới vào bảng Student
        await Student.create({
          StudentID: student.StudentID,
          FirstName: student.FirstName,
          LastName: student.LastName,
          LastTime: student.LastTime,
        });
      }

      // Cập nhật latestTime nếu LastTime của sinh viên hiện tại mới hơn
      if (!latestTime || new Date(student.LastTime) > new Date(latestTime)) {
        latestTime = student.LastTime;
      }
    }

    // Nếu latestTime được cập nhật, cập nhật lastTimeUpdateStudent trong bảng setting
    if (latestTime) {
      await Setting.update(
        { lastTimeUpdateStudent: latestTime },
        { where: { ID: 1 } } // Điều chỉnh ID phù hợp nếu cần
      );
    }

    // Trả về phản hồi thành công với danh sách sinh viên
    return res.status(201).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    console.error("Error inserting students:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to insert students",
      error: error.message,
    });
  }
};

const getStudentsByTimeRange = async (req, res) => {
  try {
    const { startTime, endTime } = req.query;

    // Fetch students within the specified time range
    const students = await Student.findAll({
      where: Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("LastTime"),
          "%d/%m/%Y %H:%i:%s"
        ),
        {
          [Op.between]: [new Date(startTime), new Date(endTime)],
        }
      ),
    });

    // Return success response with the list of students
    return res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students by time range:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch students by time range",
      error: error.message,
    });
  }
};

module.exports = {
  insert,
  getStudentsByTimeRange,
};
