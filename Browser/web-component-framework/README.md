# web-component框架


## 安装 & 运行

```sh
# npm安装serve
npm install
# 运行
npm run start
```


## 结构说明


- lib -- 框架库函数，最核心的部分是Component及Router，另外包含API、Store、Request、DB等的封装


- config -- 配置文件
    |__ routes.js -- 路由配置

- constants -- 通用常量
    |__ 时间常量

- index.html -- html模板

- app.js -- 入口文件

- Router.js -- 前端路由

- layouts -- 页面框架

- pages -- 各子页面
    |__ homePage -- 主页
    |     |__ HomePage.js 页面组件
    |     |__ business -- 业务子组件
    |__ demoPage -- demo 页
          |__ DemoPage.js 页面组件

- components -- 通用组件

- apis -- mock接口及数据结构

- services -- 将后端服务统一封装成API形式的restful风格接口供前端调用

- store -- 数据仓库

- utils -- 工具函数

- static -- 静态文件

