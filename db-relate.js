const Sequelize = require('sequelize');

// 建立一個資料庫物件
const sequelize = new Sequelize('mydb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// 我們先搞出兩個model //
const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
});


const Comment = sequelize.define('comment', {
  content: {
    type: Sequelize.STRING
  }
});

// 使用User.hsaMany把兩個users comments table搞在一起，他的userId會對應我們得users table的id //
User.hasMany(Comment)
Comment.belongsTo(User)

// 用Comment.create去創建comment然後用userId去連結user的id //
sequelize.sync().then(() => {
  Comment.create({
    userId:6,
    content:'Wendy!!!!!!'
  }).then(()=>{
    console.log('created')
  })
});


// 我們也可以透過content去找我們想要的comment，然後用include User然後去找有這個comment的user //

sequelize.sync().then(() => {
  Comment.findOne({
    where: {
      content: 'hello'
    },
    include: User
  }).then(comment=>{
    console.log(JSON.stringify(comment.user, null, 4))
  })
});