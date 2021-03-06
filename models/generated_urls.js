'use strict';
module.exports = (sequelize, DataTypes) => {
  const generated_urls = sequelize.define('urls', {
    groupName: DataTypes.STRING,
    groupImg: DataTypes.STRING,
    userUniqId: DataTypes.STRING,
    urlType: DataTypes.STRING,
    userName: DataTypes.STRING,
    sharingUrl: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    timestamps: true,
  });
  return generated_urls;
};