# 有限状态机
每一个状态都是一个机器 
  在每一个机器里，都可以做计算、存储、输出
  所有的机器接受的输入时一致的。（参数一致的函数）
  状态机本身没有状态，就是一个纯函数
每一个机器知道下一个状态
  每一个机器都有确定的下一个状态（moore）
  根据输入决定下一个状态（Mealy）
## 有限状态机处理字符串

### 在一个字符串中找到字符"a"
  ```
  function match(string){
    for(let c of string){
      if(c=== 'a'){
        return  true
      }
      
    }
    return false
  }
  ```
### 找到ab
   ```
  function match(string){
    let foundA = false
    for(let c of string){
      if(c=== 'a'){
        foundA = true
      } else if(foundA&& c=='b'){
        return true
      } else {
        foundA = false//acb
      }
    }
    return false
  }
  ```
### 找到abcdef  =》时间复杂度 M*N
  ```
  function match(string){
    let foundA = false
    let foundB = false
    let foundC = false
    let foundD = false
    let foundE = false
    let foundF = false
    for(let c of string){
      if(c=== 'a'){
        foundA = true
      } else if(foundA&& c=='b'){
        foundB = true
      }else if(foundA&& c=='c'){
        foundC = true
      }else if(foundA&& c=='d'){
        foundD = true
      }else if(foundA&& c=='e'){
        foundE = true
      }else {
        foundA = false//acb
        foundB = false
        foundC = false
        foundD = false
        foundE = false
        foundF = false
      }
    }
    return false
  }
  ```
### 状态机写法
  每一个函数都是一个状态机，
  ```
  funcyion state(input){ //函数参数就是输入
    //在函数中，可以自由地编写代码，处理每一个状态的逻辑
    return next;//返回值作为下一个状态
  }


  //一下是调用

  while(input){
    //获取输入
    state = state(input) //把状态机的返回值作为下一个状态
  }
  ```
  
```
  function match(string){
    let state = start;
    for(let c of string){
      state = state(C)
    }
    return state == end
  }
  function start(c){
    if(c == 'a'){
      return foundA;
    }else {
      return start;//没递归，自己没调用自己
    }
  }
  function foundA(c){
    if(c == 'b'){
      return foundB;
    }else {
      return start(c);
    }
  }

  function foundB(c){
    if(c == 'c'){
      return foundC;
    }else {
      return start(c);
    }
  }
  function foundC(c){
    if(c == 'd'){
      return foundD;
    }else {
      return start(c);
    }
  }

  function foundD(c){
    if(c == 'e'){
      return foundE;
    }else {
      return start(c);
    }
  }
  function foundE(c){
    if(c == 'f'){
      return foundF;
    }else {
      return start(c);
    }
  }

  function foundF(c){
    if(c == 'f'){
      return end;
    }else {
      return start(c);
    }
  }
```
### 状态机abcabx
```
  function match(string){
    let state = start;
    for(let c of string){
      state = state(C)
    }
    return state == end
  }
  function start(c){
    if(c == 'a'){
      return foundA;
    }else {
      return start;
    }
  }
  function foundA(c){
    if(c == 'b'){
      return foundB;
    }else {
      return start(c);
    }
  }

  function foundB(c){
    if(c == 'c'){
      return foundC;
    }else {
      return start(c);
    }
  }
  function foundC(c){
    if(c == 'd'){
      return foundD;
    }else {
      return start(c);
    }
  }

  function foundA2(c){
    if(c == 'a'){
      return foundB2;
    }else {
      return start(c);
    }
  }
  function foundB2(c){
    if(c == 'b'){
      return foundX;
    }else {
      return start(c);
    }
  }

  function foundX(c){
    if(c == 'x'){
      return end;
    }else {
      return foundB(c);
    }
  }
```

作业abababx处理
可选作业：KMP,如何用状态机处理未知的pattern？


# HTML的解析 parse
## 第一步：文件拆分
为了方便文件管理，我们把parse单独拆到单独的文件中  
parse接受HTML文本作为参数，返回一颗DOM树  
## 第二步： 创建状态机
我们使用FSM(有限状态机)来实现HTML的分析  
在HTML标准中，已经规定了HTML的状态  
Toy-Browser只挑选其中一部分的状态，完成一个最简单版本  
## 第三步：解析标签
主要标签有：开始标签、结束标签、自封闭标签  剩下的类型暂时不管
在这一步我们暂时忽略属性  
## 第四步：创建元素
在状态机中，除了状态迁移，我们还要加入业务逻辑  
我们在标签结束状态提交标签token
## 第五步：处理属性
属性值分为单引号、双引号、无引号三种写法，因此需要比较多状态处理  
处理属性的方式跟标签类似  
属性结束时，我们把属性加到标签的Token上 
## 第六步：栈转换成元素
从标签构建DOM树的基本技巧是使用栈  
遇到开始标签时创建元素并入栈，遇到结束标签时出栈  
自封闭节点可以视为入栈后立即出栈  
任何元素的父元素是它入栈前的栈顶  
## 第七步：处理文本节点
文本节点和自封闭标签比较类似  
多个文本节点需要合并



# css computing
### 环境准备
npm i css 
### 第一步：收集css规则
不考虑link的情况
遇到style标签时，我们把css规则保存起来  
这里我们调用cssParse来分析css规则  
这里我们必须仔细研究此库彩纷css规则的格式  
在标签出栈之前执行addCSSRules的操作，如果在标签入栈时执行，那么标签里的style样式还没加载完  

### 第二步：添加调用
创建一个元素后，立即计算css
理论上，当我们分析一个元素时，所有的css规则已经收集完成  
在真实的浏览器中，可能会遇到在body中的style标签，需要重新CSS计算的情况，这里我们忽略。
1. 重排、重绘问题：
   重排一定会导致重绘，重绘不一定会重排
2. 重新计算css
   重新计算css，会导致重排，然后就会重绘。
   如果style标签有某一个放在body之后，就会使原来计算好的css又重新计算，就会产生重新计算css，都会发生一次闪动
   所以我们的css应该尽可能放在前面，
   style属性不参加css重新计算

### 第三步 获取父元素序列 
1. 在computedCss函数中，我们必须知道元素的所有父元素才能判断元素是否匹配  
2. 我们从上一步骤的stack，可以获取本元素所有父元素  
3. 因为我们首先获取的是“当前元素”，所以我们获取的和计算父元素匹配的顺序是从内向外的  
   div div #myid
   前面两个div不知道匹配哪个元素，后面这个#myid一定是匹配当前元素  

### 第四步 拆分选择器
复合选择器：body .a.b
我们就处理三种 body .a #id(三种简单选择器)
div>span  div+span  //
div是附加在span上，顺便检查了一下span的父元素
父子选择器、子孙选择器之间的区别
行内样式：style属性
内联样式：
父子>；子孙是空格；
1. 选择器也要从当前元素向外排列  
2. 复杂选择器拆分成针对单个元素的选择器，用循环匹配父元素队列  
### 第五步：计算选择器与元素的匹配关系
main>div.a#id[attr=value]把复合选择器拆开，分别为：main>、div、.a、#id、[attr=value]
****根据选择器的类型和元素属性，计算是否与当前元素匹配  
这里仅仅是实现了三种基本选择器，实际的浏览器中要处理复合选择器  
实现复合选择器（实现支持空格的class选择器，可选）  
真实的浏览器也是先获取规则，再算  

### 第六步：生成computed属性
一旦选择器匹配，就应用选择器到元素上，形成computedStyle

### 第七步：优先级 specificity

```
<style>
a{
  color:#f00;
}

a{
  color:#0f0;
}

div a{
  clolr:#00f;
}
.x{

}
body div.container a.x#y{}
[3,2,1,0]

div.container a.x#y{}
[2,2,1,0]
body div a.x#y{}
[3,1,1,0]
四元组
[标签选择器，class选择器，id选择器，inline样式]
</style>
<body>
    <div>
        <a class="x" id="y" style="color:blue;"></a>
    </div>
</body>
```
css四元组表示一条css的优先级，比较的时候从高位开始比较，从最后以为开始比较
important并不是第五个优先级  
会把css分为两组，一组是有important，一组是没有important
