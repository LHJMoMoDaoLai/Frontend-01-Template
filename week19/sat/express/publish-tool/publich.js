const http = require('http');
const fs = require("fs")
console.log(33333)
// const querystring = require("querystring")
var archiver = require('archiver');


let filename = "./package"
let packageName = "./package"
// fs.stat(filename,(error,stat)=>{

  
  
  
  

  // console.log(stat)
  const options = {
    host: 'localhost',
    port: 8081,
    method:"POST",
    path:"/?filename=package.zip",
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length':0
      // ,
      // 'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
  });

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  
  
  archive.directory(packageName, false);
  // archive.pipe(fs.createWriteStream("./package.zip"));
  
  archive.finalize()
  archive.pipe(req)
  archive.on('end', function() {
    console.log("end")
    req.end();
  });
  
  
  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
 
  
  
  
  // archive.on("end",()=>{
  //   // req.writeHead(200, { 'Content-Type': 'text/plain' });
  //   req.end();
  // })

  /*let readStream = fs.createReadStream("./1.jpg")
  readStream.pipe(req)
  // 将数据写入请求主体。
  // req.write(postData);
  readStream.on("end",()=>{
    // req.writeHead(200, { 'Content-Type': 'text/plain' });
    req.end();
  })*/
// })

// const postData = querystring.stringify({
//     'msg': '你好世界'
//   });



//   




  