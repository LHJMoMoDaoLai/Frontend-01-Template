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