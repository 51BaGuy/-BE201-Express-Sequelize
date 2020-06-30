const db = require('../db')

const userModel ={
  add : (user,cb) =>{
    db.query(
      'insert into users(username,password,nickname) values (?,?,?)',
      [user.username,user.password,user.nickname] , 
      (err,results) => {
      if (err) return cb(err);
      cb (null)
    })
  },

  get: (username,cb)=>{
    db.query(
      'select * from users where username = ? ',[username],(err,results) =>{
        if (err) return cb(err);
        // 取第零個值
        cb (null,results[0])
      })
  }
}

module.exports = userModel