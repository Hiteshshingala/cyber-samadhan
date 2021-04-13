'use strict';
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define('address', {
    userId: DataTypes.INTEGER,
    house: DataTypes.STRING,
    type: DataTypes.STRING,
    suite: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    comType: DataTypes.STRING,
    addressType: DataTypes.STRING,
    useType: DataTypes.STRING,
    useTypeDefault: DataTypes.STRING,
    verifiedBy: DataTypes.STRING,
    costCode: DataTypes.STRING,
    zip: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {});
  address.associate = function(models) {
    // associations can be defined here
    address.belongsTo(models.users, {
      foreignKey: "userId",
      foreignKeyConstraint: true
    });
  };
  return address;
};