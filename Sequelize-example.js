const Sequelize = require('sequelize');

// 建立一個資料庫物件
const sequelize = new Sequelize('mydb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// 設立一個table
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
}, {
  // options
});


// 用這個去新建資料，也可以用其他語法
sequelize.sync().then(() => {
  User.create({
    firstName: 'Lil',
    lastName: 'Peep'
  }).then(()=>{
    console.log('created')
  })
});