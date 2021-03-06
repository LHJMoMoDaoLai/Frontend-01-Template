# 编程语言通史 
## 分类
### 语言按语法分类  
#### 非形式语言 
（中文，英文）
#### 形式语言(乔姆斯基谱系）
乔姆斯基谱系源于上世纪五十年代。对于计算机语言来说，上世纪40年代是计算机历史上的黄金时期  =》追溯法  
##### 乔姆斯基谱系
1. 0型：无限制文法 
相对于其他三型来说
无限制型文法：
? ::= ?
<a><b> ::= "c"













2. 1型：上下文相关文法  
一个词放在这儿是这个意思，放在那儿是那个意思，词的意思和上下文相关，与无限制文法相比，上下文相关文法已经有了一定要求
```
? <A> ? ::= ? <B> ?
"a"<b>"c" ::= "a" "x" "c"
"```四则运算" <LogicalExpression> "```" ::= 
     "```四则运算" 
    （<AdditiveExpression> |
        <LogicalExpression> "||" <AddtiveExpression> |
        <LogicalExpression> "&&" <AdditiveExpression>）
    "```"
```
```
{
    get a {return 1},
    get:1
}  //上下文相关文法
```
对编译器、解析器、引擎的实现者不友好
3. 2型：上下文无相关文法  
大部分语言都是主体上上下文无相关文法，  
javascript不是上下文无关文法，但是他会在某个小的点上违反上下文无关原则，但是这个语言呢99%都是上下文无关的
this 语义上多变，语法上不多变
a.this  和 this.a是两个东西  这个就属于上下文相关
上下文无关文法  
```
<A> ::= ? 
<Add>::= <MultiplicativeExpression>  | 
    <Add> "+" <MultiplicativeExpression> |
    <Add> "-" <MultiplicativeExpression> 
```
4. 3型：正则文法 
能用正则表达式解析的文法 
对表达能力的限制比较强
```
2**1**2 //正则文法  

```
javascript正则支持回溯，处理的比较慢，大部分是线性的  
大部分语言都是二型：上下文无关文法
```
<A> ::= <A> ?
<A> ::= ?<A> 错的
```
正则表达式写四则预算
```/0|[1-9][0-9]*/```

AdditiveExpression:
    MutiplicativeExpression
    AdditiveExpression + MultiplicativeExpression 
    AdditiveExpression - MultiplicativeExpression

现代语言的特例：
c++中，*可能表示称号或者指针，具体是哪个，取决于型号前面的标识符是否被声明为类型 
    声明的标识符可能在很前面了，所以语法跟语义相关了。非形式化语言，连0型都达不到。在写编译器的时候，预处理一下，跟javascript pre-process一样，预处理一边class声明，再根据这个class申明再解析。
VB中，<可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
    一型文法-上下文相关文法：
Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent 
    行首生成大括号，在词法分析阶段就被处理了。
JavaScript中，/可能表示除号，也可能是正则表达式开头，处理方式类似于VB，字符串模板中也需要特殊处理}，还有自动插入分号规则
    同VB

文法  =》词法 + 语法
词法通过正则做一遍初略的处理，把语言分成一个个词，再把词作为输入流，去做语法分析。
所以今天的很多的语言都做了词法和语法
#### 产生式(BNF巴克斯范式)
1. 用尖括号括起来的名称来表示词法结构名  
2. 词法结构分成基础结构和需要用其他语法结构定义的复合结构
   基础结构称终结符
   复合结构称非终结符
3. 引号和中间的字符表示终结符
4. 可以有括号
5. *表示重复多次
6. |表示或
7. +表示至少一次  
可递归
小练习：
1. "a""b"，可以以任何个“a”和“b组成
```
<Program>::= "a"+ | "b"+  //表示多个a或多个b 但是没有ab
<Program>::= ("a"+ | "b"+)+
```
2. 定义一个加法，允许连续加 
```
<Number>::=  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<Decimal>::= "0" |( "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") <Number>*
0
1 0304903490 //( "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9")1-9的数开头排除了01,这个不是合法的十进制数

<Add>::= <Decimal> "+" <Decimal> //加法 十进制数加上一个十进制数 必须两个数
//如果想一个数加也可以 只需要去掉加好后面的
<Add>::= <Decimal>
//如果想多个数连加，只需要递归一下
<Add>::=<Add> "+" <Decimal>//连加

//把以上的合并一下：
<Add>::= <Decimal> | <Add> "+" <Decimal>
<Decimal>//一个数
<Add> "+" <Decimal>//多个数

//乘法：
<MultiplicativeExpression>::= <Decimal>  | <MultiplicativeExpression> "*" <Decimal>

```
3. 四则运算  
```
//1 + 2 * 3  //加法 左项1*1；右项2*3  =》两个乘法表达式相加得来的  =》
<Add>::= <MultiplicativeExpression> | <Add>  "+" <MultiplicativeExpression>
           
<logicalExpression>::= <Add> |
    <logicalExpression> "||" <Add> |
    <logicalExpression> "&&" <Add>

<PrimaryExpression>::= <Decimal> |
    "(" <LogicalExpression>")"

<MultiplicativeExpression>::= <Decimal>  | 
    <MultiplicativeExpression> "*" <Decimal> |
<MultiplicativeExpression> "/" <Decimal> 

<Add>::= <MultiplicativeExpression>  | 
    <Add> "+" <MultiplicativeExpression> |
    <Add> "-" <MultiplicativeExpression> 

```

语言的分类
1. 形式语言-用途
1.1 数据描述语言
```
JSON,HTML,XAML,SQL,CSS
```
1.2 编程语言
```
C,C++,JAVA,C#,Python,Ruby,Perl,Lisp,T-SQL,Clojure,Haskell,Javascript
```
2. 形式语言-表达方式
2.1 声明式语言
```
JSON,HTML,XAML,SQL,CSS,Lisp,Clojure,Haskell
```
2.2 命令型语言
```
C,C++,JAVA,C#,Python,Ruby,Perl,Javascript
```



#### 图灵完备性  TSQL
跟图灵机等效的都具有图灵完备性  图灵停机问题  一切不都是能被计算机去解决的
可计算的  能计算的  =》图灵机 
图灵统计问题  
1. 命令式 -图灵机
. goto
. if和while
2. 声明式-lambda
. 分支和递归
css不是图灵完备的
想做计算机语言，必须图灵完备性。  
#### 动态与静态
1. 动态
在用户设备/在线服务器上
在产品实际运行时
Runtime 运行时
2. 静态
在程序员的设备上  
产品开发时  
Compiletime 编译时
为了让语言少出bug,更静态好
#### 类型系统
1. 动态类型系统与静态类型系统
2. 强类型与弱类型
隐士转换=》弱类型   TS
动态类型 不等于 强类型
无隐士转换的类型系统，叫做强类型，有隐士转换的类型系统，叫做弱类型
String+ Number
String == Boolean  
Boolean =>Number  String=>Number  再比较
"0" =false "false" != false
弱类型纠错更难。  
C++是弱类型
3. 复合类型
结构体（键值对）
```{a:T1,b:T2}```
函数签名（参数列表和返回值）
二元组  位置必须对
``` (T1,T2)=>T3```
4. 子类型
类型继承 
凡是能用到Array<Parent>的地方，都能用Arry<Child> =>协变
凡是能用Function<Child>的地方，都能用Function<Parent> =>逆变

逆变/协变
同向=》协变
逆向=》逆变

#### 一般命令式编程语言
1. Atom原子
    Identifier(标识符)、Literal
    变量名、直接量
2. Expression 
    Atom、Operator（操作符） 
    表达式     
3. statement 语句
   Expression、Keyword、Punctuator（符号）
4. strucure 结构化
   Function、Class、Process、Namespace
5. Program
   Program、Module、Package、Library

语法   =》 语义   运行时
乘法：右结合  2**2**3 === 256
二星文法
除法  左结合  9/3/3  ==1

大部分表达式左结合  

255个实体
csrf=>cookie
不要支持表单提交  cors去隔离  不接收put型的  不接受get/post表单提交  
json stringy  和递归对比两个对象是否完全一样


#
###unicode Blocks 
字符集  一个字符的集合  
码点
BMP
fromCodePoint
codePointAt()

InputElement
    WhiteSpace //空格
    LineTerminator //回车
    comment //注释

    Token 
    
#### WhiteSpace 
tab
VT
FF
SP
NBSP no-break space
ZWNBSP zero width no-break space 

USP =>SPACE

BOM bit order mask

#### 换行符
LF  \n
CR  \r
LS 不要用这两个东西
PS 不要用这两个东西 
 超出bmp的支持 几乎都是不支持  
关于“回车”（carriage return）和“换行”（line feed）这两个概念的来历和区别。
在计算机还没有出现之前，有一种叫做电传打字机（Teletype Model 33）的玩意，每秒钟可以打10个字符。但是它有一个问题，就是打完一行换行的时候，要用去0.2秒，正好可以打两个字符。要是在这0.2秒里面，又有新的字符传过来，那么这个字符将丢失。

于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做“回车”，告诉打字机把打印头定位在左边界；另一个叫做“换行”，告诉打字机把纸向下移一行。

这就是“换行”和“回车”的来历，从它们的英语名字上也可以看出一二。
 line
 
 #### 注释
  /**/ => /*\u002a/ =>这样嵌套不行
  
#### token
    IdentifierName //标识符
        用作变量名的部分 =》变量名不能跟关键字重合
        用作属性的部分=》属性部分可以跟关键字重合
        有些不是关键字但是可以做关键字来只能 比如  var get = 10
        {
            get a{
            }
        }
        比如setAttribute
        Identifier =>必须以字母开头（$；_）），可包含数字 ZWNJ、ZWJ
        Keywords
        feture reserved Keywords:enum
        undifine 全局改不了值
        只有在函数中可以改
        var undefined = ""
        function(){
            undefined = 3
        }
        var null =>直接报错
    Keywords //关键字  直接量
    Punctuator  //符号 （）；= < ;
    Literal 
        Number
            IEEE 754
               
                sign符号位1位
                Exponent 11位
                F人action  52位
            DecimalLiteral
                0
                0.
                .2
                1e3
                0b=>二进制
                0o=>八进制
                parseInt("100",2)
            BinaryIntegerLiteral
                0b111
            OctallntegerLiteral
                0o111
            HexIntger
                
                小练习  正则写javascriptNumber
                
            Math.abs(0.1+0.2-0.3) <= Number.EPSILON
            转成整数在处理  算人命币 以分为单位
        String
            Character
            Code Point
            Ascll 0 -128
            Unicode
            UCS ==>超出FFFF都没有 是Unicode的子集 U+0000 - U+FFFF(65536)
            GB
                GB2312
                GBK(GB13000)
                GB18030
            ISO-8859
            BIG5
            UTF
            UTF8  两个字节
            UTF16 四个字节
            97 .toString(2) =>这个.前面的空格会默认是97. 加一个空格  就不是一个合法的整数  靠空格的分割 调整语法结构
            0110 0001 
            
            \b\f\n\t\r\v  
        
        UTF8转gbk
        浏览器的un
    ""/''/``     
    "\b" 
    ### 特殊字符
    ```  
    u+0020 空格
    u+0021 感叹号
    u+0022 双引号
    u+0023 井号
    u+0024 价钱/货币符号
    u+0025 百分比符号
    u+0026 英文“and”的简写符号
    u+0027 引号
    u+0028 左圆括号
    u+0029 右圆括号
    u+002a 星号
    u+002b 加号
    u+002c 逗号
    u+002d 连字符号/减号
    u+002e 句号
    u+002f 由右上至左下的斜线

    u+003A 冒号
    u+003B 分号
    u+003c 小于符号
    u+003d 等于号
    u+003e 大于符号
    u+003f 问号
    u+0040 英文at的简写符号

    u+005B 左方括号
    u+005C 由左上至右下的斜线
    u+005D 右方括号
    u+005e 抑扬（重音符号）^
    u+005f 下划线_
    u+0060 重音符

    u+007b 左花括号
    u+007C 或符号|
    u+007D 右花括号
    u+007E 波浪纹~    
    ```
    
    
    


