'use strict';
module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define('company', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    companyInfo: DataTypes.STRING,
    subsidary: DataTypes.STRING,
    parent: DataTypes.STRING,
    costCode: DataTypes.STRING,
    verified: DataTypes.STRING,
    paySetup: DataTypes.STRING,
    payUsingParent: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    timestamps: true,
  });
  company.associate = function(models) {
    // associations can be defined here
    company.belongsTo(models.users, {
      foreignKey: "userId",
      foreignKeyConstraint: true
    });
  };
  return company;
};