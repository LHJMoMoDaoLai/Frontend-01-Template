const http = require('http');
const fs = require("fs")


let filename = "./1.jpg"
fs.stat(filename,(error,stat)=>{
  const options = {
    host: 'localhost',
    port: 8000,
    method:"POST",
    path:"/?filename=1.jpg",
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stat.size
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.on('data', (chunk) => {
      console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
      console.log('响应中已无数据');
    });
  });

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
 

  let readStream = fs.createReadStream("./1.jpg")
  readStream.pipe(req)
  // 将数据写入请求主体。
  readStream.on("end",()=>{
    // req.writeHead(200, { 'Content-Type': 'text/plain' });
    req.end();
  })
})






  