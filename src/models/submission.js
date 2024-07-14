const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const Student = require("./student");
const Class_Sessions = require("./class_sessions");

const Answer = sequelize.define(
    "Submissions",
    {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questions: {
            type: DataTypes.JSON,
            allowNull: false
        },

        AmountCorrect: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        StudentID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Student,
                key: "StudentID",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        SessionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Class_Sessions,
                key: "SessionID",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

    },
    {
        tableName: "Submission",
    }
);

Answer.belongsTo(Student, { foreignKey: "StudentID" });
Answer.belongsTo(Class_Sessions, { foreignKey: "SessionID" });

module.exports = Answer;
