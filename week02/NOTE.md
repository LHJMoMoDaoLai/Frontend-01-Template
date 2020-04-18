# 编程语言通史 
## 分类
### 语言按语法分类  
#### 非形式语言 （中文，英文）
#### 形式语言（）
图灵完备性  TSQL
css不是图灵完备的

可计算的  能计算的  =》图灵机 
图灵统计问题  

命令式
goto
if和while
声明式-lambda
分支和递归

动态与静态
动态
在用户设备/在线服务器上
在产品实际运行时
Runtime

静态
    在程序员的设备上  
    产品开发时  
    Compiletime

类型系统
    动态类型系统与静态类型系统
    强类型与弱类型
        隐士转换=》弱类型   TS
        动态类型 不等于 强类型

        String+ Number
        String == Boolean 
    复合类型
        结构体（键值对）
        函数签名（参数列表和返回值）
    子类型
        类型继承 
        逆变/协变
        同向=》协变
        逆向=》逆变

    一般命令式编程语言
    Atom原子       Expression   statement       strucure       Program
    Identifier     Atom         Expression      Function       Program
    Literal        Operator     Keyword         Class          Module
                   Punctuator   Punctuator      Process        Package
                                                Namespace      Library


语法   =》 语义   运行时
乘法：右结合  2**2**3 === 256
二星文法
除法  左结合  9/3/3  ==1

大部分表达式左结合  

255个实体
csrf=>cookie
不要支持表单提交  cors去隔离  不接收put型的  不接受get/post表单提交  
json stringy  和递归对比两个对象是否完全一样