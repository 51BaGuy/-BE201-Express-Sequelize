'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userr = sequelize.define('Userr',{
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING 
  },{})
  Userr.associate = function(models){
    Userr.hasMany(models.Comentt)
  }
  return Userr;
};