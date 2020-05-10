# 极客大学「前端进阶训练营-第1期」作业提交仓库

## 讲师课件下载地址

请大家通过该链接查看讲师课件并进行下载，链接: https://pan.baidu.com/s/1JFtYmCg2aGRcMAnCnqZRbw 密码:xanj


## 仓库目录结构说明

1. `week01/` 代表第一周作业提交目录，以此类推。
2. 请在对应周的目录下新建或修改自己的代码作业。
2. 每周均有一个 `NOTE.md` 文档，你可以将自己当周的学习心得以及做题过程中的思考记录在该文档中。

## 作业提交规则
 
1. 先将本仓库 Fork 到自己 GitHub 账号下。
2. 将 Fork 后的仓库 Clone 到本地，然后在本地仓库中对应周的目录下新建或修改自己的代码作业，当周的学习总结写在对应周的NOTE.md文件里。
3. 在本地仓库完成作业后，push 到自己的 GitHub 远程仓库。
4. 最后将远程仓库中当周的作业链接，按格式贴到班级仓库对应学习周的issue下面。
5. 提交issue请务必按照规定格式进行提交，否则作业统计工具将抓取不到你的作业提交记录。 


### Review 与点评
1. 助教会Review并点评大家的作业。
2. 你也可以看到其他同学的作业，取长补短。

## 注意事项
 如果对 Git 和 GitHub 不太了解，请参考 [Git 官方文档](https://git-scm.com/book/zh/v2) 或者极客时间的[《玩转 Git 三剑客》](https://time.geekbang.org/course/intro/145)视频课程。


## tip
### 正则 
's123rhjeh'.match(/(123)/)
捕获：
【“123”，“123”，index:1,input:1....】
?: => 不捕获
's123rhjeh'.match(/(?:123)/)
【“123”，index:1,input:1....】
\1;\2\3
带回溯的正则时间复杂度就到一个比较不确定的值
不带回溯的正则时间复杂度跟字符串长度和正则长度成正比的 
不推荐使用正则，结果不可预期，

### 超精度的有理数
用数组存数字，
遇到除法，整数加余数的方法来处理

https://github.com/Ele-Peng/Frontend-01-Template/blob/master/week03/converStringToNumber.md
https://github.com/xiaodaobiepao/Frontend-01-Template/blob/master/week03/homework.md
https://github.com/Yhxang/Frontend-01-Template/blob/master/week03/SpecialObject.md