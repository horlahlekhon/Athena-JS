'use strict';
module.exports = (sequelize, DataTypes) => {
  var companies = sequelize.define('companies', {
    companyid: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    tagline: DataTypes.STRING,
    location: DataTypes.JSON,
    count: DataTypes.INTEGER
  }, {});
  companies.associate = function (models) {
    // associations can be defined here
  };
  return companies;
};