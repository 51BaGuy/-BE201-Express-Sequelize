const db = require('../db')

const todoModel ={
  getAll : (cb) =>{
    db.query('SELECT * from todos',(err, results)=>{
      // 執行cb這個function err的部分，就像是我們我們的錯誤傳過去
      if (err) return cb(err)
      // 這就是把我們的結果傳過去
      cb(null,results)
    });
  },

  get : (id,cb) =>{
    // 我們用prepare statement 防止sql injection 
    db.query('SELECT * from todos where id = ? ',[id], (err, results) => {
      if (err) return cb(err);
      cb (null,results)
    });
  },

  add :(content,cb) =>{
    db.query('insert into todos(content) values(?) ', [content], (err) => {
      if (err) return cb(err);
      cb (null)
    });
  }
}

module.exports = todoModel