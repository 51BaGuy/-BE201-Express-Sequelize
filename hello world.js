const express = require('express')
const app = express()
const port = 5001

// 後面是callback function
app.get('/', (req, res) => res.send('Hello World!'))

// 後面是callback function
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))