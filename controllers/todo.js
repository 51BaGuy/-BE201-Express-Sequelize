const todoModel = require('../models/todo')

const todoController = {
  getAll: (req,res) =>{
    const todos = todoModel.getAll()
    // 會直接去views找
    res.render('todos',{
      todos
    })
  },

  get: (req,res) =>{
    const id = req.params.id
    const todo = todoModel.get(id)
    res.render('todo',{
      todo
    })
  }
}

// 輸出資料
module.exports = todoController