const Student = require('../models/student'); // Import your SessionComputer model

// Endpoint to insert students
insert = async (req, res) => {
    try {
        const students = req.body; // Assuming req.body is an array of student objects
        // Insert or update the students into the database
        for (const student of students) {
            const existingStudent = await Student.findOne({ where: { StudentID: student.StudentID } });

            if (existingStudent) {
                // Nếu StudentID đã tồn tại, cập nhật thông tin học sinh
                await existingStudent.update({
                    FirstName: student.FirstName,
                    LastName: student.LastName,
                    LastTime: student.LastTime

                });
            } else {
                // Nếu StudentID chưa tồn tại, thêm mới vào bảng Student
                await Student.create({
                    StudentID: student.StudentID,
                    FirstName: student.FirstName,
                    LastName: student.LastName,
                    LastTime: student.LastTime
                });
            }
        }

        // Return success response
        return res.status(201).json({
            status: 'success',
            data: students
        });
    } catch (error) {
        console.error('Error inserting students:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert students',
            error: error.message,
        });
    }
};


module.exports = {
    insert,
};
