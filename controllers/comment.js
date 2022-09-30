const db = require('../models')
const Comment = db.Comment
const User = db.User

///// 我們這邊用非同步的方式去做調用 //////
const commentController = {
  add: (req, res) => {
    // 這是ES6的解構語法，可以把右邊物件屬性的值，拉給左邊
    const { userId } = req.session
    const { content } = req.body
    if (!userId || !content) {
      // 這邊懶得寫錯誤哈 //
      return res.redirect('/')
    }
    // 用id把comment跟user兩個table連結在一起
    Comment.create({
      content,
      UserId: userId
    }).then(() => {
      res.redirect('/')
    })

  },
  index: (req, res) => {
    Comment.findAll({
      //要把user include進來才有使用者資料
      include: User
    }).then(comments => {
      res.render('index', {
        comments
      })
    })

  },
  // 我們編輯按鈕
  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
      }
    }).then(comment => {
      res.render('update', {
        comment
      })
    })
  },
  // 我們的編輯邏輯要有權限控制用UserId
  handleUpdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.update({
        content: req.body.content
      }).then(() => {
        res.redirect('/')
      }).catch(() => {
        res.redirect('/')
      })
    })

  },
  // 我們用UserId做權限管理
  delete: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.destroy()
    }).then(() => {
      res.direct('/')
    }).catch(() => {
      res.redirect('/')
    })
  }
}

// 輸出資料
module.exports = commentController