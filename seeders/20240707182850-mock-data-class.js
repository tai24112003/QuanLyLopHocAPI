module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date();

    await queryInterface.bulkInsert(
      "classes",
      [
        {
          ClassName: "CD TH 21 B - Nhập môn lập trình",
          Status: 1,
          UserID: 1,
          LastTime:
            date.toLocaleDateString("en-GB") +
            " " +
            date.toLocaleTimeString("en-GB", { hour12: false }),
          createdAt: date,
          updatedAt: date,
        },
        {
          ClassName: "CD TH 21 DD - Lập trình nhúng",
          Status: 1,
          UserID: 1,
          LastTime:
            date.toLocaleDateString("en-GB") +
            " " +
            date.toLocaleTimeString("en-GB", { hour12: false }),
          createdAt: date,
          updatedAt: date,
        },
        {
          ClassName: "CD TH 21 WEBC - Lập trình front end",
          Status: 1,
          UserID: 1,
          LastTime:
            date.toLocaleDateString("en-GB") +
            " " +
            date.toLocaleTimeString("en-GB", { hour12: false }),
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("classes", null, {});
  },
};
