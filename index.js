const express = require('express')

const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = 5001


////// 把userController引入進來 //////
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')

///// template engine /////
app.set('view engine', 'ejs')

///// 新增body-parser middleware /////
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

///// 新增connect-flash middleware /////
app.use(flash());

///// 新增session middleware ///////
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 整個app都用的到username errorMessage
// res.locals 就有點像一個 global 的地方，不同 view 都需要用到的訊息，統一放在這裡，所有的 view 就都能存取的到
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})


app.get('/', commentController.index)

// 做一個next的middlware
function redirectBack(req, res) {
  res.redirect('back')
}

// 做出各種路由 //
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

// 做一個新增留言的路由 //
app.post('/comments', commentController.add)
// 這是要有id的寫法
app.get('/delete_comments/:id', commentController.delete)
// 我們去寫編輯留言的路由 //
app.get('/update_comments/:id', commentController.update)
app.post('/update_comments/:id', commentController.handleUpdate)


// 後面是callback function
app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)
})