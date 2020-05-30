# 每周总结可以写在这里



# 重学CSS
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