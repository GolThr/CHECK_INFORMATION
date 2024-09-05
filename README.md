# 查客核对
CHECK INFORMATION
该项目为本科毕业设计，旨在提供一个信息核对的交互平台，其前端中所有组件均为自己使用原生代码手动实现。

该项目已转移到Gitee（GitHub代码最后更新2021.04.08）
https://gitee.com/golthr/CHECK_INFORMATION.git

### 界面预览
##### 发起人界面
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image1.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image2.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image3.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image4.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image5.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image6.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image7.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image8.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image9.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image10.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image11.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image12.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image13.png)
##### 参与者界面
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image14.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image15.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image16.png)
##### 管理员界面
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image17.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image18.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image19.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image20.png)
![image](https://github.com/GolThr/CHECK_INFORMATION/blob/main/assets/image21.png)

### 工作进程
##### 基础功能
1. 信息核对管理模块
   * ~~所有表单列表~~
   * ~~导入信息~~
   * ~~表格的使用、在线编辑功能~~
   * ~~添加信息、添加列、删除行/列~~
   * ~~发布核对、暂停核对~~
   * ~~导出信息~~
   * ~~所有表单列表项按钮：开始/结束、查看分享信息、删除（删除同时删除分享）~~
   * ~~美化CheckBox~~
   * ~~所有表单列表为空时的显示~~
   * ~~信息分页显示，先排序，后分页~~
   * ~~发布核对，配置信息时，密码长度和内容检验~~
   * ~~自定义按列排序显示~~
   * 核对分享时间限制
   * 支持列属性：列类型、列输入规则（模板、支持直接输入正则表达式）
   * 增加是否已修改列
   * ~~bug: 管理数据时，修改信息不应自动改修改时间~~

2. 信息核对用户核对模块
   * ~~分享链接不存在页面~~
   * ~~分享链接打开：输入验证码核对，输入验证信息查询用户所属信息~~
   * ~~核对信息页面：显示、编辑功能~~
   * ~~核对信息页面：提交更改、完成核对~~
   * ~~核对完成页面~~
   * 验证码不区分大小写

3. 主页
   * ~~表单总计、正在进行总计~~
   * ~~正在进行核对的表单数据显示：快速预览~~
   * ~~公告总计、未读消息数~~
   * ~~公告横幅滚动显示~~
   * ~~公告横幅滚动显示: 检测时间自动显示~~

4. 个人中心
   * ~~用户信息（个人资料显示）：头像、用户名、邮箱、手机号~~
   * ~~用户信息（个人信息修改）：头像、用户名、邮箱、手机号~~
   * ~~用户信息（个人信息修改）：头像~~
   * ~~账号安全：修改密码~~
   * ~~账号安全：登录记录显示~~
   * ~~账号安全：二次验证开关~~
   * ~~账号安全：异地登录保护开关~~
   * ~~账号安全：注销账号~~
   * ~~账号安全：登录记录显示,展示3个月之内的登录记录~~
   * ~~消息~~
   * ~~公告~~
   * ~~反馈~~
   * 反馈显示管理员留言
   * 打赏
   * 关于
    
5. 登录注册
   * ~~登录~~
   * ~~注册~~
   * ~~忘记密码~~
   * ~~注册输入检查（输入正确性、邮箱、手机号不可重复注册！！）~~
   * ~~错误3次需输入验证码~~
   * ~~验证码验证逻辑：在后端验证 session 验证~~
   * ~~登录记录ip和位置~~
   * ~~登录信息写入cookie，7日之内有效~~
   * ~~二次验证~~
   * ~~异地登录保护~~
   * ~~注册之后发送使用方法系统消息~~
   * 手机注册框架
   * 手机注册接入API
   * 增加新用户标志，新用户首次登录无需异地登录验证，新用户首次使用可弹出简单操作指引

6. 管理员后台管理
   * ~~界面设计：消息、公告~~
   *  ~~发送消息~~
   * ~~所有用户界面、排序、搜索、跳转发送消息~~
   * ~~发送公告~~
   * ~~密码验证~~
   * ~~用户反馈查看~~
   * ~~已注销用户建议查看~~
   * ~~主页设计~~
   * ~~主页信息显示~~
   * ~~管理员权限转让，邮箱为id~~
   * ~~某些情况下自动发送系统消息~~
   * 数据库设置：端口、密码、数据库名
   * 消息和公告正文支持markdown或html
   * 管理员用户设置权限，分为管理所有和只处理反馈消息
   
7. 介绍页面

8. 后续处理
   * ~~内测码输入验证页，内测码区分大小写~~
   * 字体大小，正常12~13px
   * 美化

9. 数据库
   * 创建定时任务，每天执行，对超过3个月的登录记录删除
   
10. 部署网站
   * 注意检查Apache时区是否一致
   * 需composer安装PhpSpreadsheet、phpmailer
   * 修改linux中php的require路径:ReadExcel.php, sendEmail.php, export_excel.php, dbconfig.php
   * 配置htaccess
     RewriteEngine On
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteRule ^([^\.]+)$ $1.html [NC]

      RewriteCond %{REQUEST_URI} ^/s/ [NC]
      RewriteRule ^(.*)$ check.html [NC]

##### 附加功能
1. 收集表
2. 站内用户分享
3. 发布核对者编辑表单时，可选某列类型：文本、单选框、单选按钮
4. 设置、主题
5. 鼠标悬浮在某些字段浮动显示文字
