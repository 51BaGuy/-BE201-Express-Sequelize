const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;

///// 我們這邊用非同步的方式去做調用 //////
const userController = {
  
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填呦!')
      return next()
    }

    userModel.get(username, (err, user) => {
      // 如果執行錯誤 //
      if (err) {
       req.flash('errorMessage', err.toString())
       return next()
      }
      // 如果沒有這個user資料 //
      if (!user){
        req.flash('errorMessage','使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.password, function (err, isSuccess){
        if(err || !isSuccess){
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.username
        res.redirect('/')  
      })
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
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
      // 把我們註冊的資料用我們的邏輯放進去資料庫，並且看有沒有出錯，沒有錯誤的話就把username存進去session裡面 //
      userModel.add({
        username,
        nickname,
        password: hash
      }, (err) => {
        if (err) {
          req.flash('errorMessage', err.toString())
          return next()
        }
        req.session.username = username
        res.redirect('/')
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