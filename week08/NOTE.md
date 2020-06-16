# 每周总结可以写在这里

## 选择器
### 简单选择器
**+ *
**+ div svg|a 
+ .class
+ #id
+ [attr=value]
+ [attr~=value] 用空格分隔，其中任意一项匹配就好
+ [attr|=value] 以这个值开头的 start With
+ [attr] 只要有这个属性就可以
+ :hover 伪类
+ ::before 伪元素

### 选择器语法
1. 复合选择器
   + <简单选择器><简单选择器><简单选择器>
   + *或者div必须卸载最前面
   + 伪类和伪元素必须写在后面
2. 复杂选择器
   + <复合选择器><space><复合选择器> 空格=》子孙关系
   + <复合选择器>">"<复合选择器> 大于号 =》子选择器
   + <复合选择器>"~"<复合选择器>  sibling相关，跟邻居相关
   + <复合选择器>"+"<复合选择器> sibling相关，跟邻居相关
   + <复合选择器>"||"<复合选择器> level4,table里选择一列
3. 选择器列表
   + <复杂选择器>","<复杂选择器>
### 选择器优先级
选择器优先级分为四级：
inline-style  
id  
class  
tag  
用四元组表示：```[inline-style,id,class,tag]```  
#id div.a#id{} => ```[0,2,1,1]```  
s = 0* N^3 + 2* N^2 + 1 * N^1 + 1 * N^0   
N是一个足够大的数  
```[id=x]``` 这个选择器和class选择器权重一样  
### 伪类
1. 最早期的，为a标签服务的伪类
   + :any-link
   + :link :visited
   + :hover
   + :active
   + :focus
   + :target
2. 树结构
  + :empty
  + :nth-child
  + :nth-last-child
  + :first-child :last-child :only-child
  + :nth-of-type :first-of-type :last-of-type
  last-child、only-child、nth-last-child这几个在TOY浏览器解析css的时候(startTag)，实现有问题,这几个需要回溯，浏览器即使实现了，也不推荐使用,
3. 逻辑性
   + :not伪类
   + :where :has 这几个都是level4的

### 伪元素
  + ::before
  + ::after 
  + ::firstLine
  + ::firstletter
  
  ```
  <div>
    <:before/>
    content
    <:after/>
  </div>
  ```
  before、after是啥也没有，硬生生的塞一个元素进去，有css属性，有content属性，塞内容。做语义和表现分离  
  firstLine、firstletter是本来有东西，咱们给它框起来了。  
  first-letter选中已有内容的第一个字母   
  + 示例
  ```
  <div>
    <::first-letter>c</first-letter>content
  </div>
  ```
  + 可用属性
  + + font系列
    + color系列
    + background系列
    + text-decoration
    + text-transform
    + letter-spacing
    + word-spacing
    + line-height
    + float
    + vertical-align
    + 盒模型系列：margin、padding、border
    

  first-line选中排版的第一行，跟排版相关，跟源码无关 
  + 示例：   
  ```
  <div>
    <::first-line>content content content content content</first-line>
  </div>
  ```
  + 可用属性
    + font系列
    + color系列
    + background系列
    + word-spacing
    + letter-spacing
    + text-decoration
    + text-transform
    + line-height

为什么first-letter可以设置float之类的，而first-line不行呢？
 float脱离文本流出去，first-line就不是first-line,first-line就会无限循环了
first-line改了字体，内容就变了，但是为什么能改字体呢？
  first-line并不是先算好了哪些文字在first-line里面，再去应用这些属性。而是我们在排版的过程中把相关的属性直接加到文字上。  
  文字是一个一个的，first-line相关属性一个一个的都加到文字上，直到这一行满了，就结束了。所以作用在first-line上的属性都是和文字相关的属性，没有作用于盒的属性。  
  这是一个跟排版非常相关的属性，也就是说，我们在layout的时候去操作computedCSS相关内容
  而first-letter内容固定，想怎么搞怎么搞





### 作业：编写一个match函数，检查某个元素是否match selector




# 属性  
## 排版、渲染
### 盒（box）
#### 标签  元素  盒
源代码 语义  表现

HTML代码中可以书写开始标签、结束标签和自封闭标签。
一对起止标签，表示一个元素  
DOM树中存储的时元素和其它类型的节点（Node）.
CSS选择器选中的时元素。
CSS选择器选中的元素，在排版时可能产生多个盒。
    一个inline元素换行可以产生多个盒（inline的盒）
排版和渲染的基本单位是盒。


#### 盒模型
分成四层，从里到外：
content、padding、border、margin。
width:在现代浏览器里，表示的是content
box-sizing: 
+ content-box  
  content的内容
+ border-box
  content、padding、border

### 正常流
#### 正常流排版
+ 收集盒收进行里，就会产生一个行盒
+ 计算盒在行中的排布
+ 计算行的排布
  
  Te inline-box inline-box  =》inline formating context 从左到右排布  IFC

  line-box和block-box是从上到下排的

  line-box block-level-box block => block formating contetx  ：从上到下排布 BFC



  Block-level：表示可以被放入BFC
  Block-container:表示可以容纳BFC
  Block-box = block-level + block-container
  block-box如果overflow是hidden,那么就跟父BFC合并
  block-box是block-level和block-container的交集


flex、inline-flex 
table、inline-table、
grid inline-grid、
block、inline-block

inline

run-in

block、inlin-block这两个是正常流

flex-container里面的元素(flex-items)，都是block-contain,如果flex-items display:flex就不是block-level。但是lex本身不是block-container,所以不产生BFC.

block-level包含：flex、table、grid、block
block-container:block

display:分为两个部分：第一部分是当前元素在外面的表现形式，另一部分是约束它的子元素
```
  <div style="font-size:50px;line-height:100px;background-color:pink;">
    <div style="vertical-align:text-bottom;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <div style="vertical-align:text-top;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <span>Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello </span>
    <div style="vertical-align:text-bottom;line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:top;line-height:70px;width:100px;height:50px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:base-line;line-height:70px;width:100px;height:550px;background-color:plum;display:inline-block">1</div>


</div>
```
####  正常流的行模型
文字有一个本身的空间
文字有对齐的基线
有行高

#### float与clear
float支持margin
float会导致重排，但是范围比较小
脱离文档流：float不在行盒里了，不再遵循从左到右的排版规则、
first-line上用float失效。
first-line是正常流的第一行 
第一个字可以float,
first-letter=>源码里的第一个first-letter
first-line =>css渲染里的第一行文字

#### margin折叠
margin边距折叠只会发生在BFC里 =>
    inline-box、float里都不会发生。
    只会发生在垂直方向上
    
    不产生BFC,就不会边距折叠、比如display:flex、overflow：visible
    正常流里面放正常流，就有可能产生BFC

#### BFC与float的关系




### flex
排版：
收盒进行

## 交互