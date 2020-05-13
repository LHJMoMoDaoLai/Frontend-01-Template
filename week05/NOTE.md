# Javascript中的结构化程序设计的基础设施
结构化：
泛型编程、函数式编程
react hooks 算是函数式？
标准的过程式的写法。看起来是函数，其实是有副作用的函数。
在javascript里搞函数式，现在函数式比较推崇haskell、lamada。lisp是古老的函数式

## JS执行粒度
    
  1. 宏任务
  2. 微任务
  3. 函数调用
  4. 语句/声明
  5. 表达式
  6. 直接量/变量/this
   
## Realm 王国、国度、梦境（2018年放进js中）
就是一套完整的内置对象。对应一个global对象。它的粒度比宏任务更大。可以为宏任务之间共享数据。
每个realm会床照一整套。
realm之间可以互相通信吗？在c++李是可以的，在js中，可以创建一个iframe，然后通过window来互相通信

1. JS Context =>Realm
   js引擎的实例
2. 宏任务
   所有的宏任务在jsContext中去执行，一个宏任务有很多微任务，每个函数有一个stateMentList
3. 微任务
4. 函数调用
   ```
   import {foo} from "./foo.js"
   var i = 0;
    console.log(i)
    foo()
    console.log(i)
    i++

    //foo.js
    function foo(){
        console.log(i)
    }
    export foo;
   ```
   执行上下文栈（execution context stack）
   1. code ealuation state(async/await 、generater)
   2. Function
   3. script or Module
   4. Generator
   5. Realm
        装了内置对象的盒子
        一个Realm有143个对象，
        除了 iframe 还有什么生成 realm 的办法?
        在浏览器里是没办法的，在oc里是有办法的，调一下啊[[JSContext alloc] int]就产生一个realm
      1. 在JS中，
      ```
      var arr = new Array();
      var obj = new Object();
      ```
   6. LexicalEnviroment（词法环境）
      1. this 
      2. new.target
      3. super
      4. 变量
   7. VariableEnvionment(变量环境)
      1. 处理历史遗留的包袱，仅仅用于处理var声明
        ```
        {
            let y = 2;
            eval('var x = 1;')
        }
        with({a:1}){
            eval('var x;')
        }
        console.log(x)
        ```
       1. Enviroment Records
          1. Declarative Enviroment Records
          2. Glo
          3. 

    function:foo2
    Enviroment Record:y:2
    Code:console.log(y,2)
    Enviroment Record 
5. 语句声明
6. 表达式
7. 直接量/变量/this

# 浏览器工作原理
## 总论与HTTP
1. 浏览器url敲一下回车，浏览器发生了啥?
url - http  > HTML - parse > dom -css computing > DOM With CSS -layout> DOM With position - render > Bitmap
url经过了HTTP请求，拿到了HTML,解析，生成dom树，解析css,排版，dom树位置确定，然后渲染，然后得到一张图片。
houdini可以在侯三节操作（从css解析开始一直往后）
1. ISO-OSI七层网络模型
  1. 应用
    http
    require("http")
  2. 表示
    http
    require("http")
  3. 会话
    http
    require("http")
  4. 传输
    tcp、TLS/SSL
    require("net")
  5. 网络
    Internet
  6. 数据链路
    4G/5G/WIFI
  7. 物理层
    4G/5G/WIFI
1. TCP与IP的一些基础知识
    流、端口 =>require("net")  
    包、IP地址 =>libnet/libcap
    调试：charles(mac)、fiddler(windows)
2. HTTP
    Request
    Response
    服务端不能主动给客户端发消息的，必须要客户端先给服务端发。
    http2 服务端给客户端推送的时缓存，是文件
    websocket




### http 
http相关标准文档：
  * HTTP1.1 [链接](https://tools.ietf.org/html/rfc2616)
  * HTTP1.1 [链接](https://tools.ietf.org/html/rfc7234)
HTTPS标准文档：
  * HTTPS [链接](https://tools.ietf.org/html/rfc2818)
HTTP2标准文档:
  * HTTP2 [链接](https://tools.ietf.org/html/rfc7540)

1. request
  * 组成部分
  有三部分组成，分别是：
    * Request line
    Request line又分为三部分：
      * Method
        最常见的method有GET、POST、OPTIONS、DELETE、PUT、TRACE、CONNECT、HEAD
        浏览器通过地址栏访问页面都是GET方法，表单提交产生POST方法；  
        HEAD跟GET类似，只返回请求头，多数由Javascript发起；  
        PUT和DELETE分别表示添加资源和删除资源，但实际上这只是语义上的一种约定，并没有强制约束;   
        CONNECT现在多用于HTTPS和WebSocket；OPTIONS和TRACE一般用于调试，多数线上服务不支持  
      * 路径PATH 
      url斜杠后面问号之前的部分，理论上表示目录
      * http协议版本
    * headers
    headers和body之间隔着一个空行  
    header包含以下几种：
      ![Request header](./img/requestHeader.png)  
    content-type有四种：
      * text/html  HTML格式
      * multipart/form-data 需要在表单中进行文件上传时，就需要使用该格式
      * application/json JSON数据格式
      * application/x-www-form-urlencoded ```<form encType=””>```中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
    * body

    Request line: POST / http/1.1
    header: Host: 127.0.0.1
            cobtent-Type:application/x-www-form-urlencoded
    body: field1=aaa$code=102
2. response
  * 组成部分
  有三部分组成，分别是:
    * response line
    response line又分为三部分：
      * http协议
      * http状态码
        常见状态码有一下几种：
        * 1xx：临时回应，表示客户端请继续
        * 2xx：请求成功
          200：请求成功
        * 3xx：表示请求目标有变化，希望客户端进一步处理
          301&302：永久性与零时性跳转
          304：客户端缓存没有更新
        * 4xx：客户端请求错误
          403：无权限
          404：请求页面不存在
          418： It's a teapot。这是个彩蛋，来自ietf的一个愚人节玩笑（[链接](https://tools.ietf.org/html/rfc2324)）
        * 5xx： 服务端请求错误
          500：服务端请求错误
          503：服务端暂时性错误，可以等一会儿再试
      * http状态文本
    * headers
    headers和body有空行  
    header有一下几种：
    ![response header](./img/responseHeader.png)
    * body
    trucnked
    单独的一行：表示多少个字符，后面跟字符
    字符
    0：直到0为止
    断包只能用状态机来做，这个data事件的触发事件：
      * buffer写满了
      * 服务端收到了ip包
    服务端传的是个流，指不定给你发多少个包，这个buffer有可能比包大，有可能比包小

