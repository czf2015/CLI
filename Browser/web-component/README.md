# web-component框架


## 安装 & 运行

```sh
# npm安装serve
npm install
# 运行
npm run start
```


## 结构说明

- index.html -- html模板

- config -- 配置文件
    |__ routes.js -- 路由配置

- constants -- 通用常量
    |__ 时间常量

- app.js -- 入口文件

- register-component.js -- 最上层组件注册

- Router.js -- 前端路由

- layouts -- 页面框架

- pages -- 各子页面
    |__ homePage -- 主页
    |     |__ HomePage.js 页面组件
    |     |__ business -- 业务子组件
    |__ demoPage -- demo 页
          |__ DemoPage.js 页面组件

- components -- 通用组件

- helper.js -- 基础函数

- apis -- mock接口

- services -- 业务

- store -- 数据仓库

- utils -- 工具函数

- static -- 静态文件

