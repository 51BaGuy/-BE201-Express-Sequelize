'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    //寫關聯用的(Comment是連結User資料庫)
    Comment.belongsTo(models.User)
  }

  return Comment;
};
