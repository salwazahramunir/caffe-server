'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DrinkConcoctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Menus",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      raw_material_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "RawMaterials",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      dose: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DrinkConcoctions');
  }
};