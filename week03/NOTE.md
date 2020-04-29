#javascript
## Atom
### Grammar
#### 简单语句
3个产生的是normal,4个产生的是非normal
##### ExpressionStatement
涉及到计算的部分，告诉计算机进行计算，语句最主题的部分
```
var a = 1 + 2;
```
##### EmptyStatement
一个分号
```
;
```
##### DebuggerStatement
一个debugger,产生调试中断
```
debugger;
```
##### ThrowStatement
```
throw a;
```
##### ContinueStatement
```
contunue label1;
```
##### BreakStatement
```
break label2;
```
##### ReturnStatement
```
return 1 + 2;
```
#### 复合语句
##### BlockStatement
 1. 作用很重要，当我们需要用异常语句的地方，我们可以放一个block,把它变成多条语句。

```
[[type]]:normal(执行结果就是normal,一旦有非normal的结果出现，它就不继续执行了)
[[value]]:--
[[target]]:--
{
//一对大括号，和对象很像，但是对象不能出现在表达式语句的头的，
}
```
```
{a:1}//a会被理解为label
```
2. 在新版的js中，又有为const、let提供作用域的作用
```
const a = 1;
const a = 2;//这样会报错
```
```
{
const b = 2;
}
{
const a = 1;
}
//这样就不会报错，但是在任何地方都访问不到这个b
```
3. 执行结果就是normal,一旦有非normal的结果出现，它就不继续执行了
```
{
const a = 1;
throw 1;//throw 非normal语句 后面就会不执行了
//非normal语句：return、break、continue,改变语句执行顺序的基础逻辑。
let b = 2;
b = foo();
}
```

##### IfStatement

##### SwitchStatement
##### IterationStatement
*  while(...) ...
如果while里面有throw或return,while整个的语句的completion就会变成throw或者return。  
但是while有一个特点，如果里面的东西是continue或者break,while就会把它消费掉。如果是break，后面就不执行了
如果是continue，就继续去执行语句的结果，但是他会把block中断掉
while里面的语句会执行多次，这就是循环的特点。  
while可能一次也不执行
* do ... while(...);
至少会执行一次
* for(.... ; ... ; ...;)...
```
fot(let i = 0; i<10;i++){
	console.log(i)//0-9
}
```
```
var i =0 ;
for(;i<10;i++){
	let i = 0;
	console.log(i)//输出10个0，输出的是let声明的i;如果没有let声明，打印出来的就是0-9
}```
```
for(let i = 0;i<10;i++){
	let i = 0;
	console.log(i)//输出10个0；这样这个for循环中定义的i就只适用在let i = 0;i<10;i++这几句，循环体内的i不适用
}
```
类似于以下结构
```
{
	let i = 0;
	{
		let i = 1;
		console.log(i)//1 在这个里面就访问不到外面的i
	}
	console.log(i)//0
}
```
```
for(let i = 0;i<10;i++){
	console.log(i)
	let i = 0;
	console.log(i)
}//会报错
```
var的迷惑行为:var是完全不受块级作用域影响的
```
for(var i =0; i<10; i++){
	console.log(i)
}
```
等效于：
```
for(i =0; i<10; i++){
	var i;
	console.log(i)
}
```
等效于：
```
for(i =0; i<10; i++){
	console.log(i)
}
var i;
```
等效于：
```
function foo(){
	for(i =0; i<10; i++){
		console.log(i)
	}
	return;
	var i;//只要不出现在函数体外，就都是可以等效的
}
```
* for(.... in ...) ...
循环一个对象的所有属性。循环的不是属性的值，而是属性(key)
```
for(let p in {a:1,b:2}){
	console.log(p)//答应出来a、b
}
```
* for(.... of ...) ...
循环一个数组,访问其中的每一个元素
```
for(let p of [{name:1,age:18},{name:2,age:17}]){
	console.log(p)//{name:1,age:18}；{name:2,age:17}
}
```
for of 会和generator混合起来用
```
function *g(){
	yield 0;
	yield 1;
	yield 4;
}
for(let p in g() ){
	console.log(p)//0;1;4
}
```
for of => Iterator => Generator/Array
* for await (of)
* var 
* const/let
* in

##### WithStatement
##### LabelledStatement
##### TryStatement
#### 声明
### Runtime
#### Completion Record
是一条记录，语句完成之后状态的描述
completion中这个type是一个非常核心的东西，执行不执行，执行的次序，完全是由type来决定的。
```
[[type]]：normal,break,continue,return,or throw
[[value]]:Types(七种语言类型，有可能是空没有涉及到值,只有return、throw会用到)
[[target]]:label（为了循环、break、continue）
```
#### Lexical Enviroument
## Expression
## Statement
## Structure
## Program/Module

#### Expression

##### member
a.b
a[b]
foo`string`
foo
##### new

##### call
    foo() 
    super()
    foo()['b']
    foo().b
    foo()`abc`

    new a()['b']
```
class foo{
    constructor(){
        this.b = 1
    }
}
new foo()['b']//1

foo['b'] = function(){

}
```

#### Left Handside& Right Handsize
左手表达式的极限就是call
等号左边是一个reference
```
foo() = 1 //符合语法


call Expression
new Expression
```

右值表达式
update

++ a
-- a
a ++
a --
a ++  不能换行  换行不成立
```
a /*
*/++
```
这个也是会不成立的
##### Unary
```
delete a.b
void foo（）
typeof a
+a
-a
~a
!a
await a
```
void 0代表undefined 起到一个改变语法结构的作用
```
for(var i =0;i<10;i++){
    var button = document.createElement('button')
    document.body.appendChild(button)
    button.onclick=function(){
        console.log(i)
    }
}
不管点啥都是10
```
立即执行的表达式（IIFE）

```
for(var i =0;i<10;i++){
    var button = document.createElement('button')
    document.body.appendChild(button)
    (function(i){
        button.onclick=function(){
            console.log(i)
        }
    })(i)
    void function(i){
        button.onclick=function(){
            console.log(i)
        }
    }(i)
}
```
两个非  一定会转换成一

* / %
* +-
* << >> >>>
* < > <= >= ins
* && ||
* ? : 三目运算
* ,

短路逻辑
```
function foo1(){
    console.log(1)
    return false
}

function foo2(){
    console.log(2)
}

foo1() && foo2()  //false
foo1() || foo2()  //true 
```
false ? foo1() :foo2()

几种类型的加法？
Number类型的加法和String类型的加法
一种类型的乘法  Number类型的乘法


0b 0x 0o 10.2e10
十进制


github上  tc39下的项目test262



### Grammar

##### 简单语句
ExpressionStatement表达式语句
```a = 1 + 2;```
EmptyStatement
```;```
DebuggerStatement
```debugger;```
ThrowStatement
```throw a;```
continueStatement
```continue ```
breakStatement
```
```

###### 复合语句
blockStatement
一大括号开头的一定是blockStatement,而不是对象
```
{
    a:1
}
```
Iteration
```
while()
do  while()
for(;;)
独立产生于作用域
for( in )
for( of )
for await(of)
var 
作用函数体内，影响函数
const /let
作用范围比var大
in
```
```
for(let i =0;i<10;i++){
    console.log(i)//每次都不一样
}

var i= 0;
for(;i<10;i++){
    let i = 0;
    console.log(i)
}

let i = 0
{
    let i = 1
    console.log(i)//1
}
console.log(i)//0
```

var不受块级作用域影响的

function(){
    for(i = 0;i<10;i++){
        console.log(i)
    
    }
    return ;
    var i
    //不会报错，预处理，变量声明提升
}
run()

for(var p in {a:1,b:2}){
    console.log(a)//循环的是key，不是值
}


for(var p of [1,2,3]){
    console.log(a)//访问其中每个元素
}

```
function *g(){
    yield 0;
    yield 1;
    yield 4;
}

for(var p of g()){
    console.log(a)//0，1，4
}
```

for of => iterator =>Generator/Array 放在数组或者generator上
```
function Class{
public:
    this.a = 1;
    this.b = 2;
private:
    var x = 3;
    var y = 4;
}
```

标签、循环、break、continue
LabelledStatement
IterationStatement
ContinueStatement
BreakStatement
SwitchStatement

#### try
try{
    var a = 1;
    throw
} catch(e){
    a ++ ;
}

type:return 
value:--
target:label
```
try{
    throw 2
}catch(e){
    let e;//会报错，e已经存在，没办法再声明
    conosle.log(e)
}
```

```
var e = 2
try{
    throw 1
}catch(e){
    console.log(e)//1
}
console.log(e)//3
```
作用域和上下文的区别

作用域：变量能够作用的范围  在文本文件里的  
上下文：在执行的内存对象

ExpressionStatement  很有可能产生throw的结果  运行时错误
我们的函数体里有throw,那么会使函数报throw

[[type]]:break continue

声明
FunctionDe
```
function foo(){

}//函数声明
var o = function(){}//函数表达式

class Foo{}
var 0 = class{}
```

Generator
返回多个值的函数 
```
function * foo(){
    yield 1;
    yield 2;
    var i = 3;
    while
        yield ++
}
var o = function * foo(){

}
var gen = foo()
gen.next()//{value:1,done:false}
gen.next()//{value:2,done:false}
```
AsyncFunction
异步
```
let i = 0;
function Tick(){
    console.log(i++)
    setTimeout(tick,1000)
}

while(true){
    console.log(i++)
}

```
```
function sleep(d){
    return new Promise(resolve=>{
        setTimeout(resolve,d)
    }
}
void async function(){
    var i = 0;
    while(true){
        console.log(i++)
        await sleep(1000)
    }
}
```

AsyncGenerator

```
function sleep(d){
    return new Promise(resolve=>{
        setTimeout(resolve,d)
    }
}
async function* foo(){
    var i = 0
    while(true){
        yield i++
        await sleep(1000)
    }
}
void async function(){
    var g = foo()
    for await (let e of g){
        console.log(e)
    }
}
```
VariableStatement
在语法结构中，归类在statement中

```
var x = 0
function g(){
    var o = {x:1}
    x = 2;
    /*with(o){
        var x =3
    }*/
    /*if(false){
        var x = 1
    }*/
    console.log(x)
}

g()
console.log(x)
```
```
function foo(){
    foo2();
    console.log(i)
    return ;
    var i = 1
    function foo2(){
        console.log(2)
    }
}
```

ClassD
```
var cls1 = 0

function foo(){
    cls1 = 2
    class cls1{

    }
    
    class cls1{
        
    }
}
foo()
console.log(cls1)//报错  已经声明的 不允许再申明
let const、class一样的  
BoundNames
```
Types:
Number
String
Boolean
Object
Null
Undefined
Symbol

object:
不是数据存储的概念，结构体使数据存储的概念
三只一摸一样的鱼，其实使三个对象。
其中一只鱼尾巴没了，
其他两只不受影响。
因此在计算机中描述三只鱼，必须存储三份
每个对象都是唯一的，跟它本身的状态无关。
所以，即使状态一致的两个对象，也不相等。
我们用状态来描述对象 
我们状态的改变即是行为

对象的三要素：（state）状态、行为(behavior)、唯一性(identifier)

封装、解耦、复用  =》表述代码架构的合理性 不容易见到里面的细节，不容易改。 不容易犯错误。
继承 

多态   描述动态性的程度


Object-Prototype
原型：更接近人类原始认知的描述对象的方法
不太严谨，而是才用“相似”这样的方式去描述对象

狗咬人
咬这个行为该如何使用

我们不应该受到语言的干扰，应该遵循“行为改变状态”的原则去设计对象的行为和状态  
Object Exercise
class Human{
    hurt(damage){
        //
    }
}

object in Javascript
Object {
    属性：多个，运行时
    原型：
}

Data Propery
[[value]]
writable
enumerable
configurable//不仅管别人，也管自己

Accessor Propery
get：函数
set:都是函数
enumerable
configurable

当我们去访问这个熟悉的时候，如果这个属性没有，则会沿着原型对象


Object API/Grammar
创建对象 
{} . [] Object.defineProperty//原始面向对象的能力
Object.create / Object.setPrototypeOf / Object.getPrototypeOf //对原型的操作
new / class / extends //基于类的面向对象的编程
new / function / prototype //运行时是原型，语法上像java 历史语法

Function Object
Object [[call]]
带了call，就是funtion
用于new的function 用class

special Object
Array[[length]]

145页 9.4.4特殊对象
#### Runtime
completio Record
type: normal,break,continue,return,or throw
value:types
target:label