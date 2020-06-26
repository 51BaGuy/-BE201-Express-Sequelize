const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const app = express()
const port = 5001

const todoController = require('./controllers/todo')

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)
// 新增一個跑出表單的路由
app.get('/',todoController.addTodo)
//新增一個處理資料的路由
app.post('/todos',todoController.newTodo)

// 後面是callback function
app.listen(port, () => {
  // 連線到database
  db.connect()
  console.log(`Example app listening at http://localhost:${port}`)
})