const express = require('express')
const app = express()
const port = 5001

app.set('view engine' , 'ejs')

const todos = [
  'first todo', 'second todo', 'third todo'
]

app.get('/hello', (req, res) => {
  // 不用去打副檔名ejs他預設就是，他就會去找views裡面的檔案，把它渲染出來
  res.render('hello')
})

app.get('/todos', (req, res) => {
  // 這裡第二個參數是我們可以把todos傳進去
  res.render('todos',{
    // todos : todos 因為這兩個是一樣的，所以可以省略寫成下面這樣
    todos
  })
})

// 這邊我們去找每個id對應的選項
app.get('/todos/:id', (req, res) => {
  // 我們可以從req去撈我們的參數id
  const id = req.params.id
  const todo = todos[id]
  res.render('todo',{
    todo
  })
})

// 後面是callback function
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))