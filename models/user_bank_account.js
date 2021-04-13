'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_bank_account = sequelize.define('user_bank_accounts', {
    userId: DataTypes.INTEGER,
    type: DataTypes.ENUM('CREDITCARD', 'DEBITCARD', 'CHECKING', 'SAVINGS', 'PAYPAL'),
    name: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    routingNumber: DataTypes.STRING,
    default: DataTypes.STRING,
    mode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    costCode: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    timestamps: true,
  });
  user_bank_account.associate = function(models) {
    // associations can be defined here
    user_bank_account.belongsTo(models.users, {
      foreignKey: "userId",
      foreignKeyConstraint: true
    });
  };
  return user_bank_account;
};