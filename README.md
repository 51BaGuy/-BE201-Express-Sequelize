# -BE201-Express-Sequelize

# 簡易留言板加上會員註冊系統
這個是使用Node.js + Express + MySQL建立的專案，搭配EJS模板去做前端頁面渲染，
並且使用ORM去做操作資料庫，讓整個程式碼更好操作，也針對資安問題做了防範機制
，希望能夠帶給使用者好的體驗!
## Initial - 專案緣起
這個是一個課堂實作的作品，這個作品的目的是想要開發一個簡單的留言板產品並且有會員註冊系統，
讓使用者除了使用留言版的功能去留下自己想要的評論，也能夠使用會員系統留下自己的會員資料，
方便日後操作使用!
## Features - 專案功能與特色
* 留言板 CRUD - 新增留言、瀏覽留言、更新留言、刪除留言
* 會員註冊系統 - 會員註冊、會員登入、會員登出
* MVC規劃 - 讓整個程式編寫更為清楚明瞭
* 使用MySQL - 資料庫方面使用MySQL，穩定度高的好選擇
* 使用ORM - 讓操作資料庫不需要再輸入複雜SQL語法，直接把資料庫變成物件去操作
* 使用Bootstrap - 使用bootstrap去美化介面，增加使用者體驗
* 防止SQL injection - 使用prepare statement
* 防止偽造身分 - 使用middleware Session
## Environment SetUp - 環境建置
* Node.js
* MySQL



