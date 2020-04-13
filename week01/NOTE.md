# 学习方法
## 学习方法
[学习方法脑图](./学习方法.xmind)
# 前端架构知识体系
## 前端架构知识体系脑图
[前端架构知识体系脑图](./前端架构知识体系.xmind)
## ECMA所有类型
Reference,   
List,   
Completion,  
Property Descriptor,   
Lexical Environment,   
Environment Record,  
Data Block  
## 追溯法 

# 工程体系
## 成就
### 业务型成就
业务目标  理解公司核心目标，目标转化为指标  
技术方案  业务指标转化到技术指标    
实施方案  实施目标、参与人，管理进度  
结果评估  数据采集、数据报表，上级汇报  
示例：点击率&转化率  
tab组增加手势操作 ，组件化并推广  
### 技术难题
目标  公认的技术难点  
方案与实施  扎实的编程能力，架构能力形成解决方案  
结果  问题解决  
示例：爬取商品价格 （比价  一淘）  
方案：引入JS端的数字识别技术，靠AI技术来解决 把价格转化成图片  
实施：直接上线  
结果：成功采集到信息  
### 工程型成就
目标：质量、效率
方案与实施：规章制度、库、工具、系统
结果：线上监控
示例：xss攻击预防    
目标：XSS攻击白帽子反馈漏洞
技术方案：整理安全手册，review历史代码，代码扫描工具    
实施：对全体前端宣讲，整体review代码，更改代码发布流程  
结果：XSS漏洞大幅减少 

## 数据驱动的思考方式：一个小故事
目标=》现状=》方案=》实施=》结果=》目标  
分析业务目标，定数据指标=》 采集数据，建立数据展示系统=》设计技术方案，预估数据 =》 小规模实验，推广全公司落地形成制度=》统计最终效果，汇报  
                              
## 前端技能模型
领域知识  
前端知识  
编程能力  架构能力  工程能力  
组件化   工程链、持续集成  
工具链  
init => run => test => publish   
持续集成  
客户端软件持续集成  Daily build =>BVT  
前端持续集成  
check-in build  
Lint + Rule Check    
技术架构   
客户端架构：软件需求规模带来的复杂性   
服务端架构：解决大量用户访问带来的复杂性   
前端架构：？  
解决复用问题  
库：有复用价值的代码  
URL  IETF(https://tools.ietf.org/)  
AJAX  防重放加时间搓，加hash   
ENV   判断环境，ipd iphone   
组件：UI上多次出现的元素  
轮播  
Tab   
模块：经常被使用的业务区块  
登录  

AB测试  
spritejs https://github.com/spritejs/spritejs  
### 其他  
流量 转化率  客单价  
页面加载时长下降了    
秒开率   
活跃度= 日活/月活  
无头浏览器  不渲染 能把页面渲染完  不会真正渲染出来，看不见的浏览器  做规则检查  
高速增长的公司可以掩盖一切  

## 作业
URL解析代码

```
 function urlData(){
        let scheme,authority,path,query,fragment;
        // foo：//example.com：8042 / over / there？name = ferret＃nose 
        // scheme = ALPHA *（ALPHA / DIGIT /“ +” /“-” /“。”） 小写
            // authority   = [ userinfo "@" ] host [ ":" port ]

                    //    The authority component is preceded by a double slash ("//") and is
                    //    terminated by the next slash ("/"), question mark ("?"), or number
                    //    sign ("#") character, or by the end of the URI.
                // userinfo    = *( unreserved / pct-encoded / sub-delims / ":" )
                // host        = IP-literal / IPv4address / reg-name
                    // IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
                    // IPvFuture  = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
                // port = * DIGIT 
            // path
                // path          = path-abempty    ; begins with "/" or is empty
                //     / path-absolute   ; begins with "/" but not "//"
                //     / path-noscheme   ; begins with a non-colon segment
                //     / path-rootless   ; begins with a segment
                //     / path-empty      ; zero characters
            //  query  = *( pchar / "/" / "?" )
                // The query component is indicated by the first question
                // mark ("?") character and terminated by a number sign ("#") character
                // or by the end of the URI.
            //  Fragment   = *( pchar / "/" / "?" )

            // if ((not strict) and (R.scheme == Base.scheme)) then
            //     undefine(R.scheme);
            // endif;
            // if defined(R.scheme) then
            //     T.scheme    = R.scheme;
            //     T.authority = R.authority;
            //     T.path      = remove_dot_segments(R.path);
            //     T.query     = R.query;
            // else
            //     if defined(R.authority) then
            //         T.authority = R.authority;
            //         T.path      = remove_dot_segments(R.path);
            //         T.query     = R.query;
            //     else
            //         if (R.path == "") then
            //         T.path = Base.path;
            //         if defined(R.query) then
            //             T.query = R.query;
            //         else
            //             T.query = Base.query;
            //         endif;
            //         else
            //         if (R.path starts-with "/") then
            //             T.path = remove_dot_segments(R.path);
            //         else
            //             T.path = merge(Base.path, R.path);
            //             T.path = remove_dot_segments(T.path);
            //         endif;
            //         T.query = R.query;
            //         endif;
            //         T.authority = Base.authority;
            //     endif;
            //     T.scheme = Base.scheme;
            // endif;

            // T.fragment = R.fragment;
    }
```