const http = require('http');
const net = require('net');
const fs = require('fs');
// const { unzip } = require('zlib');
const unzip = require("unzipper")
// const { fstat } = require('fs');
// const { URL } = require('url');

// 创建 HTTP 隧道代理。
const sever= http.createServer((req, res) => {
    
    let matched = req.url.match(/filename=([^&]+)/)
    let filename = matched&&matched[1]
    if(!filename){
        return 
    }
    let writeStream = fs.createWriteStream("../server/public/" + filename)
    
    

//    let writeStream =  unzip.Extract({path:"./server/public"})
   req.pipe(writeStream)
    // req.on("data",(trunk)=>{
    //     writeStream.write(trunk)
    // })
    // req.on("end",(trunk)=>{
    //     writeStream.end(trunk)
    // })
    req.on("end",()=>{
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    })
});


sever.listen(8081)