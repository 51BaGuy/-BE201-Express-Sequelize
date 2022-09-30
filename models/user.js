'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    //拿來寫關聯用的(User 一對多 Comment)
    User.hasMany(models.Comment)
  }
  return User;
};