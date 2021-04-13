'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{role: 'ADMIN'}, {role: 'BUYER'}, {role: 'SELLER'}, {role: 'BOTH'}, {role: 'SUPPORT'}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
