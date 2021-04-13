'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // 'users' refers to table name
          key: 'id', // 'id' refers to column name in users table
        },
        onDelete: "cascade",
      },
      house: {
        type: Sequelize.STRING
      },
      suite: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      comType: {
        type: Sequelize.STRING
      },
      addressType: {
        type: Sequelize.STRING
      },
      useType: {
        type: Sequelize.STRING
      },
      useTypeDefault: {
        type: Sequelize.STRING
      },
      verifiedBy: {
        type: Sequelize.STRING
      },
      costCode: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      isDeleted: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      isActive: {
        default: false,
        type: Sequelize.BOOLEAN
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('address');
  }
};