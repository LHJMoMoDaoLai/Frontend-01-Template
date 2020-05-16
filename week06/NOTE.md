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
  找到ab
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
  找到abcdef  =》时间复杂度 M*N
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
  状态机写法
  没一个函数都是一个状态机，
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
  没递归，自己没调用自己
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
状态机abcabx

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


# HTML的解析
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



# css
### 环境准备
npm i css 
第一步：
遇到style标签时，我们把css规则保存起来  
这里我们调
第二步：添加调用
创建一个元素后，立即计算css
理论上，当我们分析一个元素时，所有的css规则已经收集完成  

第三步
