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
    os: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    accuracy: DataTypes.STRING,
    altitude: DataTypes.STRING,
    direction: DataTypes.STRING,
    speed: DataTypes.STRING,
    urlId: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
  }, {});
  return osdetails;
};