const http = require('http');

const fs = require('fs');
require('events').EventEmitter.defaultMaxListeners = 0

const server = http.createServer((req, res) => {
    let matched = req.url.match(/filename=([^&]+)/)
    let filename = matched&&matched[1]
    if(!filename){
        return 
    }

    let writeStream = fs.createWriteStream("../server/public/" + filename)
    req.pipe(writeStream)
    req.on("end",()=>{
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    })
    // res.end();
  });
  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });
  server.listen(8000);