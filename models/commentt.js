'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentt =sequelize.define('Commentt',{
    content: DataTypes.STRING
  }, {});
  Commentt.associate=function(models){
    Commentt.belongsTo(models.Userr)
  }

  return Commentt;
};