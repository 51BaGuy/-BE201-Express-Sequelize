
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models')
// 去拿裡面的user.js
const User = db.User

///// 我們這邊用非同步的方式去做調用 //////
const userController = {

  login: (req, res) => {
    res.render('user/login')
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填呦!')
      return next()
    }
    // 去找出我們要的username然後去比對，這邊會順著promise語法去找出user結果，還有err錯誤
    User.findOne({
      where: {
        username
      }
    }).then(user => {
      // 如果沒有這個user資料 //
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      // 我們isSuccess不能用req會衝到
      bcrypt.compare(password, user.password, function (err, isSuccess) {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.username
        // 找對應的id到時候比對用
        req.session.userId = user.id
        res.redirect('/')
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },


  register: (req, res) => {
    res.render('user/register')
  },

  handleRegister: (req, res, next) => {
    const { username, password, nickname } = req.body
    // 確認有沒有填//
    if (!username || !password || !nickname) {
      req.flash('errorMessage', '缺少必要欄位')
      return next()
    }
    // 判斷密碼是否正確用bcrypt這個library
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
      // 把我們註冊的資料用我們的邏輯放進去資料庫，並且看有沒有出錯，沒有錯誤的話就把username存進去session裡面 //
      User.create({
        username,
        nickname,
        password: hash
      }).then(user => {
        //用session傳username
        req.session.username = username
        req.session.userId = user.id
        res.redirect('/')
      }).catch(err => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    });
  },

  logout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  }
}

// 輸出資料
module.exports = userController