const db = require('./models/index')
const User = db.Userr
const Comment = db.Commentt

User.create({
  firstName:'Hello',
  lastName:'yo'
}).then(()=>{
  console.log('good')
})