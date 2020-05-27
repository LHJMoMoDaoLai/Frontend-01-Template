
# layout
+ 把已经处理好的css做一些处理，具体有：
  + 去掉尺寸单位，出数字便于计算；
  + 过滤display=flex的元素
  + 处理flex布局中css的默认值
  + 处理flexDirection、flexWrap属性，
+ 分行
  + 根据主轴尺寸，把元素分行
  + 若设置了no-wrap,则强行分配进第一行
+ 计算主轴
  + 找出所有Flex元素
  + 把主轴方向的剩余尺寸按比例分配给这些元素
  + 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
+ 交叉轴的计算
  + 根据一行中最大元素尺寸计算行高
  + 根据行高flex-align 和item-align，确定元素具体位置
  + 
# 重学CSS
### CSS语法的研究
CSS总体结构
@charset
@import 
rules:
    @media
    @page
    rule
产生式
？可以没有
*0条或多条
+一条或多条
 HTML注释不会对css生效 
CDO ```<!--```
CDC ```-->```
注释：/**/
空格
IDENT 标识符
ruleset
多个逗号分隔d
### CSS规则
+ Selector
  
+ Key
  Pro
+ Value