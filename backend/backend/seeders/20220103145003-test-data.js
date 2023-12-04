"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "books",
      [
        {
          title: "test",
          authors: "test",
          thumbnail: "test",
          publishedYear: 2020,
        },
        {
          title: "test2",
          authors: "test",
          thumbnail: "test",
          publishedYear: 2021,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "counts",
      [
        {
          book_id: 1,
          count: 1,
        },
        {
          book_id: 2,
          count: 2,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "lendings",
      [
        {
          user_id: 1,
          book_id: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
