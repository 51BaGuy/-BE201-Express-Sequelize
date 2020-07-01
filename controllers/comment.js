const commentModel = require('../models/comment')

///// 我們這邊用非同步的方式去做調用 //////
const commentController = {
  add : (req,res) =>{
    // 這是ES6的解構語法，可以把右邊物件屬性的值，拉給左邊
    const {username} = req.session
    const {content} = req.body
    if(!username || !content){
      // 這邊懶得寫錯誤哈 //
      return res.redirect('/')
    }
    commentModel.add(username,content,
      (err)=>{
        return res.redirect('/')
      })
  },
  index : (req,res) => {
    commentModel.getAll((err,results)=>{
      if (err) {
        console.log(err)
      }
      // 在comments放入我們的結果，然後去渲染
      res.render('index',{
        comments:results
      })
    })
  }

  
}

// 輸出資料
module.exports = commentController