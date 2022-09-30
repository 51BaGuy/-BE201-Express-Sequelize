const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('testorm', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// sequelize.close()

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

const Comment = sequelize.define('comment', {
    // attributes
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

// user 對 comment 是一對多，這樣會在comment產生 user_id (forigien key)
User.hasMany(Comment)
//表示 Comment也是關聯User
Comment.belongsTo(User)

// Note: using `force: true` will drop the table if it already exists
sequelize.sync().then(() => {
    // Comment.create({
    //     userId: 4,
    //     comment: 'Hello bro'
    // }).then(() => {
    //     console.log('Done')
    // })
    User.findOne({
        where: {
            firstName: '22',
        },
        include: Comment //加入我們要的table (相當於是join)
    }).then((user) => {
        console.log(JSON.stringify(user, null, 4)) //篩選我們要的table 這裡是選comments
    })

});


// let runPromise = (someone, timer, success = true) => {
//     console.log(`${someone} 開始跑開始`);
//     return new Promise((resolve, reject) => {
//         // 傳入 resolve 與 reject，表示資料成功與失敗
//         if (success) {
//             setTimeout(function () {
//                 // 3 秒時間後，透過 resolve 來表示完成
//                 resolve(`${someone} 跑 ${timer / 1000} 秒時間(fulfilled)`);
//             }, timer);
//         } else {
//             // 回傳失敗
//             reject(`${someone} 跌倒失敗(rejected)`)
//         }
//     });
// }
// // // 此段函式並不會影響其它函示的執行
// // runPromise('小明', 3000).then(someone => {
// //     console.log('小明', someone)
// // });


// // 以下這段 console 會在 promise 結束前就執行
// console.log('這裡執行了一段 console');

// async function getData() {
//     let mingRun = await runPromise('小明', 2000)
//     console.log('跑完了:', mingRun);
// }
// getData();

// console.log('ABC');


// /**
//  * 範例 Promise 函式
//  * 
//  * @param {數值：作為判斷非同步成功與否的條件} num 
//  * @param {數值：非同步所執行的時間長度} [time=500] 
//  * @returns {如果 num 為真則套用 resolve；失敗則套用 reject}
//  */
// function promiseFn(num, time = 500) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             num ? resolve(`${num}, 成功`) : reject('失敗');
//         }, time);
//     });
// }

// // // let obj = 1;
// // promiseFn(1)
// //     .then(res => {
// //         console.log(res); // 1, 成功
// //         return promiseFn(2); // 鏈接第二次的 Promise 方法
// //     })
// //     .then(res => {
// //         console.log(res); // 2, 成功
// //     });
// // // console.log(obj)


// async function getData() {
//     const data1 = await 1;
//     const data2 = await promiseFn(2);
//     console.log(data1, data2); // 1 "2, 成功"
// }
// getData();


// function promise() {
//     return new Promise((resolve, reject) => {
//         // 隨機取得 0 or 1
//         const num = Math.random() > 0.5 ? 1 : 0;

//         // 1 則執行 resolve，否則執行 reject
//         if (num) {
//             resolve('成功');
//         }
//         reject('失敗')
//     });
// }

// // promise.then(onFulfilled, onRejected);
// // 前者為 resolve callback，後者則為 reject
// promise()
//     .then((success) => {
//         console.log(success);
//     }, (fail) => {
//         console.log(fail);
//     })


// function promise(num, time = 500) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             num ? resolve(`${num}, 成功`) : reject('失敗');
//         }, time);
//     });
// }
// var result = Promise.resolve('result');
// result.then(res => {
//     console.log('resolved', res); // 成功部分可以正確接收結果
// }, res => {
//     console.log('rejected', res); // 失敗部分不會取得結果
// });

// /**
//  * 範例 Promise 函式
//  * 
//  * @param {數值：作為判斷非同步成功與否的條件} num 
//  * @param {數值：非同步所執行的時間長度} [time=500] 
//  * @returns {如果 num 為真則套用 resolve；失敗則套用 reject}
//  */
// function promiseFn(num, time = 500) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             num ? resolve(`${num}, 成功`) : reject('失敗');
//         }, time);
//     });
// }


// async function getData() {
//     const data1 = await promiseFn(1); // 沒用 await，promise 函式不會被終止
//     const data2 = await promiseFn(2);
//     console.log(data1, data2);
// }
// getData();


// async function getData() {
//     const data1 = await promiseFn(1); // 因為 await，promise 函式被中止直到回傳
//     const data2 = await promiseFn(2);
//     console.log(data1, data2); // 1, 成功 2, 成功
// }
// getData();