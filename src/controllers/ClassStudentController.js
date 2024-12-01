const ClassStudent = require('../models/class_student'); // Import your SessionComputer model
const Student = require('../models/student')
const Attendance = require('../models/attendance'); // Import attendance model
const ClassSession = require('../models/class_sessions'); // Import class_session model

insert = async (req, res) => {
    try {
        const Students = req.body; // Assuming req.body is an array of session computer objects

        // Duyệt qua từng sinh viên trong danh sách
        for (let element of Students) {
            // Kiểm tra xem bản ghi có tồn tại trong bảng ClassStudent hay không
            const existingRecord = await ClassStudent.findOne({
                where: {
                    StudentID: element["StudentID"],
                    ClassID: element["ClassID"]
                }
            });

            // Nếu bản ghi đã tồn tại, bỏ qua việc thêm mới
            if (existingRecord) {
                continue; // Nếu đã có bản ghi, bỏ qua sinh viên này và tiếp tục với sinh viên tiếp theo
            }

            // Nếu chưa tồn tại, tiến hành thêm sinh viên vào bảng ClassStudent
            await ClassStudent.create({
                StudentID: element["StudentID"],
                ClassID: element["ClassID"]
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Successfully added students to the class',
        });
    } catch (e) {
        console.error('Error while inserting students into the class:', e);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to add students to the class',
            error: e.message,
        });
    }
};


let getAllClasseStudent = async (req, res) => {
    try {
        const allClasses = await ClassStudent.findAll();

        // Return success response with all classes
        return res.status(200).json({
            status: 'success',
            data: allClasses,
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching all classes:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch all classes',
            error: error.message,
        });
    }
};

let getStudentsByClassID = async (req, res) => {
    try {
        const { ClassID } = req.params;
        // Find class by ClassID and include students
        const classWithStudents = await ClassStudent.findAll({
            where: { ClassID },
            include: [{
                model: Student,
            }],

        });

        if (!classWithStudents || !classWithStudents.length) {
            return res.status(404).json({
                status: 'error',
                message: 'Class not found or no students found for the class',
            });
        }

        // Extract students from the result
        const students = classWithStudents.map(classInstance => ({
            ...classInstance,
            ...classInstance.Student
        }));

        return res.status(200).json({
            status: 'success',
            data: classWithStudents,
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching students by ClassID:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch students by ClassID',
            error: error.message,
        });
    }
};
let deleteStudentsFromClass = async (req, res) => {
    try {
        const students = req.body; // Assuming req.body is an array of student objects

        // Check if the request body is an array
        if (!Array.isArray(students)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid request format, expected an array of students',
            });
        }

        // Loop through each student and perform delete operation
        for (const student of students) {
            const { StudentID, ClassID } = student;

            // Step 1: Kiểm tra xem StudentID có tồn tại trong bảng ClassStudent hay không
            const existingStudent = await ClassStudent.findOne({
                where: {
                    StudentID: StudentID,
                    ClassID: ClassID
                }
            });

            if (!existingStudent) {
                return res.status(404).json({
                    status: 'error',
                    message: `Student with ID ${StudentID} not found in ClassID ${ClassID}`,
                });
            }

            // Step 2: Xóa bản ghi từ bảng class_student
            await ClassStudent.destroy({
                where: {
                    StudentID: StudentID,
                    ClassID: ClassID
                }
            });

            // Step 3: Tìm tất cả SessionID liên quan đến ClassID
            const sessions = await ClassSession.findAll({
                where: {
                    ClassID: ClassID
                }
            });

            if (!sessions || sessions.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: `No sessions found for ClassID ${ClassID}`,
                });
            }

            const sessionIDs = sessions.map(session => session.SessionID);

            // Step 4: Xóa bản ghi từ bảng attendance liên quan đến StudentID và các SessionID
            await Attendance.destroy({
                where: {
                    StudentID: StudentID,
                    SessionID: sessionIDs
                }
            });
        }

        // Success response
        return res.status(200).json({
            status: 'success',
            message: 'Successfully removed students from classes and associated attendance records',
        });
    } catch (error) {
        // Handle error
        console.error('Error deleting students from class:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to delete students from class',
            error: error.message
        });
    }
};


module.exports = {
    insert,
    getAllClasseStudent,
    getStudentsByClassID,
    deleteStudentsFromClass
};
