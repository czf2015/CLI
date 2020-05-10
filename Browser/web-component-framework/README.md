# web-component框架


## 优点

web-component属于w3c标准，解决原生 html + js + css 开发过程中功能组件化及结构模块化的缺陷，对其进行适当封装可以实现类似vue及react开发体验。同时没有任何依赖，没有烦杂安装各类模块，极度轻量化；不需要编译即可执行，代码更利于调试；只需简单知识即能上手，同时方便进一步改进；原生在灵活性及标准在稳定性方面的优势，预示web-component这波浪潮（“去框架化”）将会来临。


## 安装 & 运行

```sh
# npm安装serve
npm install
# 运行
npm run start
```


## 结构说明


- lib -- 框架库函数，最核心的部分是Component及Router，另外包含API、Request、DB、Store等类的封装


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

- apis -- 前端调用接口及数据结构

- services -- 将后端服务统一封装成API形式的restful风格接口供前端调用

- store -- 数据仓库

- utils -- 工具函数

- static -- 静态文件

