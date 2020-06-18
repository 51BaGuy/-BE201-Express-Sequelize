const http = require('http')
const server = http.createServer(handler)

function handler (req,res){
  console.log(req.url)
  if(req.url === '/hello'){
    // 設定回應碼，還有我們的內容格式
    res.writeHead(200,{
      'Content-Type':'text/html'
    })
    res.write('<h1>hello!</h1>')
  }else if(req.url === '/bye'){
    res.write('bye')
  }else{
    res.write('invalid url')
  }
  res.end()
}

server.listen(5001)
