const express = require('express')
const app = express()
const port = 5001

const todoController = require('./controllers/todo')

app.set('view engine', 'ejs')

app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)

// 後面是callback function
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))