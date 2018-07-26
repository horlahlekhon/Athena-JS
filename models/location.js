'use strict';
module.exports = (sequelize, DataTypes) => {
  var location = sequelize.define('location', {
    locid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    state: DataTypes.STRING
  }, {});
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};