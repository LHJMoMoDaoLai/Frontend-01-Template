const http = require('http');
const fs = require("fs")

var archiver = require('archiver');


let packageName = "./package"
const options = {
    host: 'localhost',
    port: 8000,
    method:"POST",
    path:"/?filename=package.zip",
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
  });

  //打包.zip
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  
  archive.directory(packageName, false);
  // archive.pipe(fs.createWriteStream("./package.zip")); //在本地写入package包
  
  archive.finalize()
  archive.pipe(req)
  archive.on('end', function() {
    console.log("end")
    req.end();
  });
  
  
  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });  




  