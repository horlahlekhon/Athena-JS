'use strict';
module.exports = (sequelize, DataTypes) => {
  var jobtypes = sequelize.define('jobtypes', {
    typeid: DataTypes.INTEGER,
    typename: DataTypes.STRING
  }, {});
  jobtypes.associate = function(models) {
    // associations can be defined here
  };
  return jobtypes;
};