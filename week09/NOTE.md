# 每周总结可以写在这里
随机抽奖的代码
```
let students = [1,2,3,4,5,8,6,7]
let winters = [];
for(let i =0;i<10;i++){
   let winterI = Math.floor(Math.radom() * students.length)
   winters.push(students[winterI]);
   students[winterI] = students[students.length-1]; //为什么不用splice方法？
   students.pop()
}
```
为什么不用splice方法？  
因为splice的性能是o(n)的,取决于后面有多少个数。


### css动画与绘制
 + animation
    animation-name：动画的名称，这是一个 keyframes 类型的值  
    animation-duration 动画的时长  
    animation-timing-function 动画的时间曲线  
    animation-delay 动画开始前的延迟  
    animation-iteration-count 动画的播放次数  
    animation-direction 动画的方向。  
    + keyframes
      ```
      @keyframes mykf{
         from{ background: red;}
         to { background:yellow;}
      }

      @keyframes mykf1{
         0%{ background:  rgb(255,0,0);}
         25%{ background: rgb(255,75,0);}
         50%{ background:  rgb(255,150,0);}
         75%{ background:  rgb(255,225,0);;}
         100% { background: rgb(255,255,0);}
      }

      div{
         animation: mykf 5s infinite;
      }
      ```
 + transition
    transition-property 要变换的属性  
    transition-duration 变换的时长；  
    transition-timing-function 时间曲线； 
      cubic-bezier 
    transition-delay 延迟。  




# HTML

### 特别需要记住的实体
+ &quot;  &#34; \u0022
+ &amp;   &#38;#38; \u0026
+ &lt;    &#38;#60; \u003c
+ &gt;    &#62;      \u003e
  
  ```
   <!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
   <!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
   <!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
   <!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
  ```

white-space:pre-wrap或者<pre>解决空格合并和回车
### HTML标签-语义
最早是用来写论文的。  
hr 表示故事走向的转变或者话题的转变  
abbr：缩写
sup: reference标注
导航 带标签 nav ol li
ul>li
ol>li
dl dt(defination) dd (defination description)
section: 章节
samp:示例
figure figcaption
code:代码 
cite:被引的文章名
quote :引别人的note 被引得文章内容
dfn:定义
time:时间
address:表示“文章（作者）的联系方式  
语义标签到底是谁的工作，文章作者、编辑器作者、业务开发者、机器人？  编辑器作者和业务开发者。
### HTML语法
1. 合法元素
   + Element <tagname>...<tagname>
   + Text:text
   + Comment:<!---->
   + DocumentType:<!Doctype html>
   + ProcessingInstruction: <?a 1?> 会被预处理掉，没用
   + CDATA:<![CDATA[]]> 几乎可以使用任何字符 有点类似于js里的反引号
2. 字符引用
   + &#161;
   + &amp;
   + &lt;
   + &quot;

# 重学DOM
## Node
### Node结构
1. Element:元素型节点，跟标签对应
   + HTMLElement
     + HTMLAnchorElement
     + HTMLAppleElement
     + HTMLAreaElement
     + HTMLAudioElement
     + HTMLBaseElement
     + HTMLBodyElement
   + SVGElement
     + SVGAElement
     + SVGAltGlyphElement
2. Document:文档根节点
3. CharacterData:字符数据
   + Text:文本节点 
     + CDATASection
       + CDATA节点
   + Comment:注释
   + ProcessingInstruction:处理信息
4. DocumentFragment:文档片段（DOM树里是没有的，但是它可以被append到元素里）
5. DocumentType:文档类型
### Node操作
1. 导航类型的操作
   1. 包含文本节点：
      + parentNode
      + childNodes
      + firstChild
      + lastChild
      + nextChild
      + nextSibling
      + previousSibling
   2. 不包含文本节点
      + parentElement
      + children
      + firstElementChild
      + lastElementChild
      + previousElementSibling
      + nextElementSibling
      + nextElementChild
2. 修改操作
   + appendChild
   + insertBefore
   + removeChild
   + replaceChild
注意：
* 所有的DOM元素只能有一个父节点，如果把A节点两次插入到不同的父节点，它会先移除，再插入  
* chilidNodes是一个living的node，即使取出来放到另一个变量里，所有的修改操作都会改变取出来的变量 (livingCollection)   
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="x">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
    </div>
    <div id="b"></div>
</body>
<script>
    let x = document.getElementById("x")
    let b = document.getElementById("b")

    // for(let i = 0;i<x.children.length;i++){
    //     b.appendChild(x.children[i])// 2413
    // }
    while(x.children.length){
        b.appendChild(x.children[0]) // 1234
    }
</script>
</html>
```
1. 高级操作
   + compareDocumentPosition 是一个用于比较两个节点中关系的函数
   + contains 检查一个节点是否包含另一个节点的函数
   + isEqualNode 检查两个节点是哦福完全相同  
   + isSameNode 检查两个节点是否是同一个节点，实际上在javascript中可以用“===”  
   + cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝  
tip: 
x.parentNode.children  
伪元素不在DOM树上，伪元素在computedCss上出来的  
```
URL =====> HTML =====> DOM ==============>Box tree with css =======> Box tree with position =====> Bitmap
    HTTP        parse      css computing                     layout                         render
```
2. events
   * addEventListener
     * target.addEventListener(type, listener [, useCapture]);
     * target.addEventListener(type, listener [, useCapture, wantsUntrusted  ]); // Gecko/Mozilla only
         * capture
            先捕获，再冒泡
            事件代理
            如果点击了A元素，移动到B元素上放开，那么这个点击事件触发在哪个元素上？松开的地方
            那阻止冒泡 可以减少计算吧，可以，有没有意义就不知道了  
            移动端300毫秒的延迟，用touch   
            埋点：
               业务数据，跳转，和性能错误
               元素曝光埋点：解决滚动的问题，性能上不会影响太多。
               banner也会产生曝光  
               推荐只用冒泡
               老师 单页面框架怎么获取一个页面的性能？打时间出来,两个一减。

3. Borwser API
   1. web animation
   2. Crypto
   3. BOM
   4. CSSOM
   5. DOM 
      * DOM Tree
      * Events
      * Range
      * traversal
   6. ...
