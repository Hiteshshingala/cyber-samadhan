'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      companyInfo: {
        type: Sequelize.STRING
      },
      subsidary: {
        type: Sequelize.STRING
      },
      parent: {
        type: Sequelize.STRING
      },
      costCode: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.STRING
      },
      paySetup: {
        type: Sequelize.STRING
      },
      payUsingParent: {
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
    return queryInterface.dropTable('company');
  }
};