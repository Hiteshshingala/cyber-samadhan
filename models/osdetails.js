'use strict';
module.exports = (sequelize, DataTypes) => {
  const osdetails = sequelize.define('osdetails', {
    platform: DataTypes.STRING,
    browser: DataTypes.STRING,
    concurrency: DataTypes.STRING,
    ram: DataTypes.STRING,
    vendorWebgl: DataTypes.STRING,
    Webgl: DataTypes.STRING,
    screenHeight: DataTypes.STRING,
    screenWidth: DataTypes.STRING,
    os: DataTypes.STRING
  }, {});
  return osdetails;
};