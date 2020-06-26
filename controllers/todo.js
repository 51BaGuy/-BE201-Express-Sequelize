const todoModel = require('../models/todo')

///// 我們這邊用非同步的方式去做調用 //////
const todoController = {
  getAll: (req,res) =>{
    todoModel.getAll((err,results)=>{
      // 把我們的錯誤給顯示出來
      if (err) return console.log(err)
      res.render('todos',{
        todos: results
      }) 
    })
  },

  get: (req,res) =>{
    const id = req.params.id
    todoModel.get(id,(err,results)=>{
      if (err) return console.log(err)
      res.render('todo',{
        // 這就是找那唯一的結果
        todo: results[0]
      })
    })
  },

  // 去把我們的資料渲染上去
  addTodo: (req,res)=>{
    res.render('addTodo',{
      isLogin: req.session.isLogin
    })
  },

  //處理我們的資料
  newTodo: (req,res)=>{
    // 把我們解析的資料拿出來
    const content = req.body.content
    todoModel.add(content,(err)=>{
      if (err) return console.log(err)
      res.redirect('/todos') 
    })
  }

}

// 輸出資料
module.exports = todoController