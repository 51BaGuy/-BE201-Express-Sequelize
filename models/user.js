const db = require('../db')

const userModel ={
  // 把資料丟進資料庫去儲存，有使用express sql ejection的語法 //
  add : (user,cb) =>{
    db.query(
      'insert into users(username,password,nickname) values (?,?,?)',
      [user.username,user.password,user.nickname] , 
      (err,results) => {
      if (err) return cb(err);
      cb (null)
    })
  },

  // 把username對應到的資料取出來 //
  get: (username,cb)=>{
    db.query(
      'select * from users where username = ? ',
      [username],
      (err,results) =>{
        if (err) return cb(err);
        // 取第零個值
        cb (null,results[0])
      })
  }
}

module.exports = userModel