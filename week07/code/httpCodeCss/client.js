//引用net模块
const net = require('net');
const parser  = require("./parser.js")
//封装请求部分
class Request{
    //method,url = host + port + path,
    //body:k/v
    //headers content-type
    constructor(options){
        this.method = options.method || 'GET';
        this.host = options.host; 
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};

        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }

        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        } else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key]) }`).join('&');
        }
        

        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString(){
        return `
${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
    }
     
    send(connection){
      return new Promise((resolve,reject) => {
        //解析respose
        const parser = new ResponseParser
        if(connection){
          connection.write(this.toString())
        }else {
          //建立TCP连接
          connection = net.createConnection({
              host: this.host,
              port: this.port,
            },() => {
              console.log('connected to server!');
              connection.write(this.toString());
            },
          );
        }
        //接收服务端发货的数据包
        connection.on('data', (data) => {
          //接收数据包并判断包是否结束
          parser.receive(data.toString())
          if(parser.isFinished){
            resolve(parser.response)
          }
          // console.log(parser.headers)
          // resolve(data.toString());
          connection.end();
        });

        connection.on('error', (error) => {
          reject(error);
          connection.end();
        });
      })
      
    }

}

class Response{
  constructor(){
    
  }
  receive(string){
    
  }
}

class TruckedBodyParser{
  constructor(){
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.isFinished = false;
    this.length = 0;

    this.bodyBuffer = []
    this.content = []
    this.current = this.WAITING_LENGTH
  }
  
  receiveChar(char){
    // console.log(JSON.stringify(char))
    // console.log(this.current)
    if(this.current === this.WAITING_LENGTH){
      if(char === '\r'){
        if(this.length === 0){
          // console.log("///////")
          // console.log(this.content)
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
      }
    } else if(this.current === this.WAITING_LENGTH_LINE_END){
      if(char === '\n'){
        this.current = this.READING_TRUNK;
      } 
    } else if(this.current === this.WAITING_NEW_LINE){
      if(char === '\r'){
        this.current = this.WAITING_NEW_LINE_END;
      } 
    } else if(this.current === this.WAITING_NEW_LINE_END){
      if(char === '\n'){
        this.current = this.WAITING_LENGTH;
      } 
    } else if(this.current === this.READING_TRUNK){
      // const chars = utf8.stringToBytes(char)
      // for(let i = 0;i<chars.length;i++){
      //   this.bodyBuffer.push(chars[i]);
        
      // }
      this.content.push(char)
      this.length --;
      if(this.length === 0){
       this.current = this.WAITING_NEW_LINE
      }
   }

    // console.log(this.content)
    
  }
}


class ResponseParser{
  constructor(){
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;
    // this.WAITING_
    this.current = this.WAITING_STATUS_LINE ;
    this.statusLine = ""
    this.headers = {}
    this.headerName = ""
    this.headerValue = ""
    this.bodyParser = ""
  }
  //接收数据包中的字符串，拆分字符，判断字符属于response的哪一部分
  receive(string){
    for(var i = 0;i<string.length; i ++){
      this.receiveChar(string.charAt(i))
    }
  }
  get isFinished(){
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response(){
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/)
    return {
      statusCode:RegExp.$1,
      statusText:RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join("")
    }
  }
  //判断字符属于response的哪一部分，把有用的保留起来
  receiveChar(char){
    if(this.current === this.WAITING_STATUS_LINE){
      if(char === '\r'){
        this.current = this.WAITING_STATUS_LINE_END;
      } else if(char === '\n'){
        this.current = this.WAITING_HEADER_NAME;
      }else {
        this.statusLine += (char)
      }
    } else if(this.current === this.WAITING_STATUS_LINE_END){
      if(char === '\n'){
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if(this.current === this.WAITING_HEADER_NAME){
      if(char === ':'){
        this.current = this.WAITING_HEADER_SPACE;
      }else if(char == "\r"){
        this.current = this.WAITING_HEADER_BLOCK_END
        if(this.headers['Transfer-Encoding']==='chunked'){
          //准备分发解析body的任务给bodyParser对象
          this.bodyParser = new TruckedBodyParser();
        }
      } else {
        this.headerName += (char)
      }
    }else if(this.current === this.WAITING_HEADER_SPACE){
      if(char === ' '){
        this.current = this.WAITING_HEADER_VALUE;
      }
    }else if(this.current === this.WAITING_HEADER_VALUE){
      if(char === '\r'){
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue
        this.headerName = ""
        this.headerValue = ""
      } else {
        this.headerValue += (char)
      }
    } else if(this.current === this.WAITING_HEADER_LINE_END){
      if(char === '\n'){
        this.current = this.WAITING_HEADER_NAME;
      } 
    } else if(this.current === this.WAITING_HEADER_BLOCK_END){
      if(char === '\n'){
        this.current = this.WAITING_BODY;
      }
    }else if(this.current === this.WAITING_BODY){
      //接收body字符串并解析
      this.bodyParser.receiveChar(char)
    }

  

  }
}



void async function(){
  let request = new Request({
    method: "POST",
    path:"/",
    host: "127.0.0.1",
    port: "8089",
    headers:{
      ['X-Foo2']:"customed"
    },
    body: {
        name:"winter"
    }
  })
  let response = await request.send()

  // console.log(response.body)
  let dom = parser.parseHTML(response.body)
  console.log(JSON.stringify(dom,null,"    "))
}()