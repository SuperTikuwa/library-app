"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("lendings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });

    await queryInterface.addConstraint("lendings", {
      fields: ["book_id"],
      type: "foreign key",
      onDelete: "cascade",
      onUpdate: "cascade",
      references: { table: "books", field: "id" },
    });

    await queryInterface.addConstraint("lendings", {
      fields: ["user_id"],
      type: "foreign key",
      onDelete: "cascade",
      onUpdate: "cascade",
      references: { table: "users", field: "id" },
    });

    await queryInterface.addConstraint("lendings", {
      fields: ["book_id"],
      type: "unique",
    });

    await queryInterface.add;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("lendings");
  },
};
