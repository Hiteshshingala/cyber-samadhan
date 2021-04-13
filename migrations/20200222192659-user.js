'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      previlage: {
        type: Sequelize.STRING
      },
      reportingTo: {
        type: Sequelize.STRING
      },
      mobileNo: {
        type: Sequelize.STRING
      },
      validity: {
        type: Sequelize.STRING
      },
      paySetup: {
        type: Sequelize.STRING
      },
      houseNo: {
        type: Sequelize.STRING
      },
      house: {
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
      zip: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM,
        values: ['ADMIN', 'BUYER', 'SELLER', 'BOTH', 'SUPPORT'],
      },
      Verifytoken: {
        type: Sequelize.STRING
      },
      isActive: {
        defaultValue: true,
        type: Sequelize.STRING
      },
      isDeleted: {
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
    return queryInterface.dropTable('users');
  }
};