# 股票信息管理系统

## 功能分析

1. header页眉
2. footer页脚
3. sidebar侧边菜单栏
4. content主题内容
5. dashboard选项卡切换内容
6. stars星级评价组件
7. stock-manage股票管理
8. stock-form响应式表单
9. stock-filter股票搜索管道

## 后台接受API
1. `/api/stock`获取股票数据
2. `/api/stock/:id`根据id查找单个股票数据
3. `/api/savestock`表单post请求，增加股票信息
4. `/api/deleteStock/:id`删除股票信息

## 技术栈
#### 1. 本项目完全前后端分离，使用Angular CLI构建前台架构，前端由哈希路由控制，后端接受express的路由请求获取api数据
#### 2. 启用websocket服务，从后台向前台推送数据
#### 3. mongoose映射mongodb数据库

[我的微博](http://weibo.com/u/3826537889?refer_flag=1001030201_&is_all=1)
