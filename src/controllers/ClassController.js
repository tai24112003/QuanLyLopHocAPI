const Classes = require('../models/class');
let insert = async (req, res) => {
    try {
        const { ClassName } = req.body;

        // Kiểm tra xem ClassName đã tồn tại hay chưa
        const existingClass = await Classes.findOne({ where: { ClassName } });

        if (existingClass) {
            // Nếu ClassName đã tồn tại, trả về ClassID
            return res.status(200).json({
                status: 'success',
                message: 'Class already exists',
                ClassID: existingClass.ClassID,
            });
        }

        // Nếu ClassName chưa tồn tại, thêm mới vào bảng Classes
        const newClass = await Classes.create({ ClassName });

        // Trả về phản hồi thành công với ClassID
        return res.status(201).json({
            status: 'success',
            message: 'Class created successfully',
            ClassID: newClass.ClassID,
        });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error inserting class:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert class',
            error: error.message
        });
    }
};

// Function to get all classes
let getAllClasses = async (req, res) => {
    try {
        const allClasses = await Classes.findAll();

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

module.exports = { insert, getAllClasses };
