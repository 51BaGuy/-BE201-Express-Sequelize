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
  }
}

// 輸出資料
module.exports = todoController