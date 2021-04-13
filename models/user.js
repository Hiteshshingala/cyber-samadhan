'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    previlage: DataTypes.STRING,
    paySetup: DataTypes.STRING,
    validity: DataTypes.STRING,
    mobileNo: DataTypes.STRING,
    reportingTo: DataTypes.STRING,
    house: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    role: DataTypes.ENUM('ADMIN', 'BUYER', 'SELLER', 'BOTH', 'SUPPORT'),
    Verifytoken: DataTypes.STRING,
    UserUniquId: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    timestamps: true,
  });
  // users.associate = function(models) {
  //   users.hasOne(models.user_bank_account, {});
  // };
  return users;
};