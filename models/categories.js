'use strict';
module.exports = (sequelize, DataTypes) => {
  var categories = sequelize.define('categories', {
    categoryid: DataTypes.INTEGER,
    categoryname: DataTypes.STRING
  }, {});
  categories.associate = function (models) {
    // associations can be defined here
  };
  return categories;
};