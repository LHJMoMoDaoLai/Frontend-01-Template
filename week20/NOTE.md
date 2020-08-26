                # 每周总结可以写在这里
## phantomjs 无头浏览器
### 如何进行测试
+ 启动local的server
+ 对其中一些元素做断言

## 权限和白名操作
https://developer.github.com/v3/
https://developer.github.com/apps/building-oauth-apps/
- 使用GitHub的OAuth
  - [链接](https://developer.github.com/apps/building-oauth-apps/)
  - 步骤
    - 创建一个OAuth APP
      - 登录github.com,点击头像，点击settings,Developer settings => new GitHub App
    - 授权OAuth应用程序
      - 获取用户的GitHub code
        - 请求接口:GET https://github.com/login/oauth/authorize
        - 参数：
          - client_id:
          - redirect_uri:
          - login:
          - scope:[相关链接](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/)
          - state:
          - allow_signup:
      - 用code 换用户的token
        - 请求接口：POST https://github.com/login/oauth/access_token
        - 参数：
          - client_id:
          - client_secret:
          - code:
          - redirect_uri:
          - state:
