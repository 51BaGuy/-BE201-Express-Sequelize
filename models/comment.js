const db = require('../db')

const commentModel = {
  // 把資料丟進資料庫去儲存，有使用express sql ejection的語法 //
  add: (username, content, cb) => {
    db.query(
      'insert into comments (username,content) values (?,?)',
      [username, content],
      (err) => {
        if (err) return cb(err);
        cb(null)
      })
  },
  getAll: cb => {
    db.query(
      // ``這個可以換行比較容易看，這邊left join有FROM是代表比較多的左邊
      `SELECT U.nickname, C.content, C.id, C.username
       FROM comments as C
       LEFT JOIN users as U on U.username = C.username
       ORDER BY C.id DESC      
      `,
      (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      }
    )
  },
  get: (id, cb) => {
    db.query(
      // ``這個可以換行比較容易看，這邊left join有FROM是代表比較多的左邊
      `SELECT U.nickname, C.content, C.id, C.username
       FROM comments as C
       LEFT JOIN users as U on U.username = C.username
       WHERE C.id = ?      
      `, [id],
      (err, results) => {
        if (err) return cb(err);
        // 如果這邊results[0]是undefined的話就會傳空的值，這樣程式不會壞掉
        cb(null, results[0] || {})
      }
    )
  },
  update: (username, id, content, cb) => {
    db.query(
      'UPDATE comments set content=? WHERE id=? AND username=?',
      [content, id, username],
      (err) => {
        if (err) return cb(err);
        cb(null)
      }
    )
  },
  // 刪除機制
  delete: (username, id, cb) => {
    db.query(
      'DELETE FROM comments WHERE id=? AND username=?',
      [id, username],
      (err, results) => {
        if (err) return cb(err);
        cb(null)
      })
  },





}

module.exports = commentModel