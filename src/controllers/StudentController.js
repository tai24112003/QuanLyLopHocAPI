const Student = require("../models/student"); // Import your SessionComputer model
const { Op, Sequelize } = require("sequelize");
// Endpoint to insert students
const Setting = require("../models/setting"); // Điều chỉnh đường dẫn nếu cần

// Endpoint to insert or update students
const insert = async (req, res) => {
  try {
    const students = req.body; 
    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input, expected a non-empty array of students.",
      });
    }

    let latestTime = null; // To track the most recent LastTime

    // Process students
    const studentPromises = students.map(async (student) => {
      const [existingStudent, isNew] = await Student.findOrCreate({
        where: { StudentID: student.StudentID },
        defaults: {
          FirstName: student.FirstName,
          LastName: student.LastName,
          LastTime: student.LastTime,
        },
      });

      if (!isNew) {
        // Update if student already exists
        await existingStudent.update({
          FirstName: student.FirstName,
          LastName: student.LastName,
          LastTime: student.LastTime,
        });
      }

      // Update latestTime if LastTime is newer
      if (!latestTime || new Date(student.LastTime) > new Date(latestTime)) {
        latestTime = student.LastTime;
      }
    });

    await Promise.all(studentPromises);

    if (latestTime) {
      await Setting.update(
        { lastTimeUpdateStudent: latestTime },
        { where: { ID: 1 } } // Adjust the ID to match your setup
      );
    }

    // Return success response
    return res.status(201).json({
      status: "success",
      message: "Students inserted/updated successfully.",
    });
  } catch (error) {
    console.error("Error inserting students:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to insert students.",
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

const update = async (req, res) => {
  try {
    const students = req.body; // Array of students to update
    let latestTime = null; // Variable to store the latest LastTime

    for (const student of students) {
      const existingStudent = await Student.findOne({
        where: { StudentID: student.StudentID },
      });

      if (existingStudent) {
        // Update the student's information
        await existingStudent.update({
          FirstName: student.FirstName || existingStudent.FirstName,
          LastName: student.LastName || existingStudent.LastName,
          LastTime: student.LastTime || existingStudent.LastTime,
        });

        // Update latestTime if the new LastTime is more recent
        if (!latestTime || new Date(student.LastTime) > new Date(latestTime)) {
          latestTime = student.LastTime;
        }
      } else {
        // If the student does not exist, respond with an error
        return res.status(404).json({
          status: "error",
          message: `Student with ID ${student.StudentID} not found`,
        });
      }
    }

    // Update lastTimeUpdateStudent in the Setting table if latestTime was updated
    if (latestTime) {
      await Setting.update(
        { lastTimeUpdateStudent: latestTime },
        { where: { ID: 1 } } // Adjust the ID as needed
      );
    }

    // Return success response
    return res.status(200).json({
      status: "success",
      message: "Students updated successfully",
    });
  } catch (error) {
    console.error("Error updating students:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update students",
      error: error.message,
    });
  }
};


module.exports = {
  insert,
  getStudentsByTimeRange,
  update
};
