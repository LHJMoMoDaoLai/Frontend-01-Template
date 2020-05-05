# 结构化程序设计和执行过程
## Objective-c
事件循环：node或浏览器里的内容，不是javascript语言的一部分 

在oc中，可以引用一下类型：函数、代码片段、module模块
在oc的jsContext中，有两种方式引用js:
. evaluateScript
```
(JSValue *)evaluateScript:(NSString *)script;
```
. evaluateScript:withSourceURL 
```
(JSValue *)evaluateScript:(NSString *)script
            withSourceURL:(NSString *)sourceURL;
```
. function
```
//var context = new JSContext;
JSContext* context = [[JSContext alloc] init];
JSValue* result;

NSString* code = @"(function(x){ return x * x})";

result = [context evaluateScript:code];

//调用函数
//[result callWithArguments:@[]] 先传一个空参数
NSLog(@"%@", [[result callWithArguments:@[]]]);

//传参
JSValue* arg1 = [JSValue valueWithInt32:4 inContext:context]; 
NSLog(@"%@", [[result callWithArguments:@[arg1]]]);

```
## 宏任务、微任务
oc中有Promise
```
new Promise(resolve => resolve()).then(()=>this.a = 3),
sfunction(){return this.a}
```
```
//var context = new JSContext;
JSContext* context = [[JSContext alloc] init];
JSValue* result;

NSString* code = @"new Promise(resolve => resolve()).then(()=>this.a = 3),
function(){return this.a}";

//匿名函数只被定义，未被执行，result拿到了后面的匿名函数，并调用了匿名函数，就产生了第二个宏任务
//result拿到了后面的匿名函数:为啥拿到匿名函数？原因：有‘，’
//逗号的作用
//var x = (1,2,3)
//console.log(x)打印3
//同理：result拿到了匿名函数
result = [context evaluateScript:code];

//调用函数
//[result callWithArguments:@[]] 先传一个空参数 result()
NSLog(@"%@", [[result callWithArguments:@[]]] toSrting);
//callWithArguments，意思是把第一个宏任务的返回值，也就是函数，执行了一次
```
在这一段代码中，有两个宏任务，如下：
1. [context evaluateScript:code]在这一段代码里面，有两个小的任务：第一个是promie和一个匿名函数，第二个是匿名函数中this.a = 3  
因为有一个resolve被执行了，就产生了第二个微任务this.a = 3

2. [result callWithArguments:@[]]调用这个函数执行了一个人物，返回this.a
function(){return this.a}匿名函数只被定义，未被执行，result拿到了后面的匿名函数，并调用了匿名函数，就产生了第二个宏任务  
result拿到了后面的匿名函数:为啥拿到匿名函数？原因：有‘，’  
逗号的作用  
var x = (1,2,3)
console.log(x)打印3
同理：result拿到了匿名函数


其实所有的JS代码都是一个微任务，只是哪些微任务构成了一个宏任务；执行在JS引擎里的就是微任务，执行在JS引擎之外的就是宏任务，循环宏任务的工作就是事件循环。
并不是说有then才会存在微任务，有then可能产生一个宏任务中有多个微任务的情况，但是一切js中的代码都是在微任务中执行的。
拿浏览器举例：setTimeout、setInterval、.onclick 这种其实不是 JS 语法本身的 API，是 JS 的宿主浏览器提供的 API，一个Script标签内的就算是一个宏任务, 所以是宏任务。
script,UI交互，setTimeout,setInterval都是宏任务  
而 Promise 是 JS 本身自带的 API，这种就是微任务。
总结：宿主提供的方法是宏任务，JS 自带的是微任务

这样设计有什么好处吗  
这是以一个被迫的，promise是js标准的一部分，不提供微任务，就不能解释promise,宏任务不在js标准内，而微任务在js标准内。

正常的promise是没有办法把微任务延迟执行的。在一个promise中有多少个resolve，就有多少个额外的微任务
按理 promise 产生一个微任务，而 funciton 是按顺序执行，应该会比promise 结果早一点。是因为OC 里面每调用一步都会把微任务执行完，
oc不是一个同步的代码，是可以等的，
任务列表列里面有很多宏任务，然后每个宏任务里面有一个微任务列表，每个宏任务执行第二个宏任务之前会把自己内部的微任务执行完，
实际在浏览器中，如何区分宏任务？

js引擎类的目的就是把一段js执行掉，js引擎似于一个库，而一个宏任务队列类似于把一个库包成了一个服务，一个服务就会一直在那里等着，筛给它一段代码它就执行一下，

在执行宏任务的时候， setTimeout的定时任务到时间了是怎么被执行的？
在遇到settimeout之前有sleep。宏任务有数组去存，会把宏任务放到数组里，在执行evaluateScript之前会sleep一下，等下一个任务的时间
setTimeout不会是有一个线程去计时，单开线程，管理很麻烦，还要图同步计时结果，很麻烦  
setTimeout不准时执行的
oc的sleep是真的这个线程就闲下来了，和while(true)等待输入是不一样的，while(true)不是一个真正的死循环，换到jsvascript中可以说是一个await sleep
await、then之前都是同步代码

```
new Promise(resolve => resolve()).then(()=>{
    console.log("1");
})

setTimeout(function(){
    console.log("2");
},0)
console.log("3")

//执行结果：3，1，2
```

```
new Promise (resolve =>resolve()).then(()=> this.a = 3)

setTimeout(function(){
    console.log(this.a)
},0)

//打印3
```

```

new Promise (resolve =>resolve()).then(()=> console.log("1"))

setTimeout(function(){
    console.log("2")

    new Promise(resolve=>resolve()).then(()=> console.log("3"))
},0)
console.log("4")
//4，1，2，3
```

```
new Promise (resolve =>(console.log("0"),resolve())).then(()=> console.log("1"))

setTimeout(function(){
    console.log("2")

    new Promise(resolve=>resolve()).then(()=> console.log("3"))
},0)
console.log("4")
console.log("5")
//打印出0，4，5，1，2，3
```
有两个宏任务，setTimeout和其他代码
*. 宏任务
同步代码有0，4，5；
1是第一个微任务的异步代码 ，
*. 宏任务
2是第二个宏任务里的第一个微任务 异步，
3是第二个宏任务里的第二个位任务 异步

```
async function afoo(){
    console.log("-1");
}

new Promise (resolve =>(console.log("0"),resolve())).then(()=> console.log("1"))

setTimeout(function(){
    console.log("2")

    new Promise(resolve=>resolve()).then(()=> console.log("3"))
},0)
console.log("4")
console.log("5")
afoo()
//打印出0，4，5，-1,1，2，3
```
如果async中没有await,async函数就相当于同步代码，在await之前都是同步代码
1. 宏任务
0，4，5，-1
1
2. 宏任务
2
3

```
async function afoo(){
    console.log("-2");

    await new Promise(resolve => resolve());
    console.log("-1")
}

new Promise (resolve =>(console.log("0"),resolve())).then(()=> console.log("1"))

setTimeout(function(){
    console.log("2")

    new Promise(resolve=>resolve()).then(()=> console.log("3"))
},0)
console.log("4")
console.log("5")
afoo()
//0，4，5，-2，1，-1，2，3
```
-1变成了第三个微任务
1. 宏任务
0，4，5，-2， 
1
-1
2. 宏任务
2
3

```
async function afoo(){
    console.log("-2")


    await new Promise(resolve => resolve());
    console.log("-1")
}


new Promise(resolve => (console.log("0"), resolve()))
    .then(()=>(
        console.log("1"), 
        new Promise(resolve => resolve())
            .then(() => console.log("1.5")) ));


setTimeout(function(){
    console.log("2");
    
    new Promise(resolve => resolve()) .then(console.log("3"))


}, 0)
console.log("4");
console.log("5");
afoo()
这一段代码有两种执行结果：
//在苹果电脑和node上的结果：0, 4, 5, -2, 1, 1.5, -1, 2, 3
//在window电脑上执行结果是: 0, 4, 5, -2, 1, -1 1.5, 2, 3

```
分析：
1. 宏任务
0，4，5，-2， 
1
-1
2. 宏任务
2
3



## 宏任务  微任务
宏任务：
script、ui交互、setTimeout、setInterval都是宏任务
宏任务是有优先级的，微任务是没有优先级的
 
