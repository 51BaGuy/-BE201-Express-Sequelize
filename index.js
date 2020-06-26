const express = require('express')
const db = require('./db')
const app = express()
const port = 5001

const todoController = require('./controllers/todo')

app.set('view engine', 'ejs')

app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)

// 後面是callback function
app.listen(port, () => {
  // 連線到database
  db.connect()
  console.log(`Example app listening at http://localhost:${port}`)
})