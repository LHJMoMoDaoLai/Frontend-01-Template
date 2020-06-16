# 每周总结可以写在这里

### Range API
```
var range = new Range();
range.setStart(element,9);
range.setEnd(element,4);
var range = document.getSelection().getRangeAt(0)


range.setStartBefore()
range.setEndBefore()
range.setStartAfter()
range.setEndAfter()
range.selectNode()
range.selectNodeContents()

range.extractContents()

```
切下来就是documentFragment  
批量操作和精细操作DOM。理论上来讲，操作DOM都可以用range来操作。
input里面不能用range做文字限制。
documentFragment

### CSSOM
1. document.styleSheets
   ```
   document.styleSheets[0].cssRules
   document.styleSheets[0].insertRule("p{color:pink;}",0)
   document.styleSheets[0].removerRule(0)
   ```
2. Rule
   + CSSStyleRule
        + style 一个规则的样式部分
        + selectorText 一个规则的选择器部分
   + CSSStyleRule
   + CSSCharsetRule
   + CSSImportRule
   + CSSMediaRule
   + CSSFontFaceRule
   + CSSPageRule
   + CSSNamespaceRule
   + CSSKeyframesRule
   + CSSKeyframeRule
   + CSSSupportsRule
    + getComputedStyle(element,pseudoElt)
        + elt想要获取的元素
        + pseudoElt可选，伪元素

### 编程训练
#### TicTacToe
规则：
棋盘  3*3方格  
双方分别由源泉和叉两种棋子  
双方交替落子  
率先连成三子直线的一方获胜  
数据结构： 一维数组和map,二维数组  
%取余换行