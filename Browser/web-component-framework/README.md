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


## 计划完成

- [ ] 虚拟dom


## 结构说明

- framework -- 框架代码

- config -- 配置文件
    |__ apis.js -- 前端调用接口

- constants -- 通用常量
    |__ TIME.js -- 时间常量

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

- models -- 数据结构

- services -- 将后端服务统一封装成API形式的restful风格接口供前端调用

- store -- 数据仓库

- utils -- 工具函数

- plugins -- 插件包
    |__ Request.js 处理请求
    |__ API.js 接口
    |__ DB.js 数据库
    |__ Store.js 状态管理
    |__ List.js 列表

- static -- 静态文件


## 风格约定

1. 类中使用`/* private */`注释表示私有方法, 只能在类自身方法内调用
2. 用`isType`来判断原生类型及自定义类型, [参照](./models/User.js) 
3. `包`(同一资源存放的文件夹)内只有对外使用的`资源`(包内定义及引入的所有资源)才在`入口`(index.js)处导出, 大包可以全部或局部导出小包中的资源，最小的包的即是文件（如utils.js）。
4. 文件是代码切分最好的手段，文件夹结构是结构组织最直观、清晰的手段
5. 类文件使用类名，尽可能简洁、通用
6. 缩写词大小写统一，如html或HTML, api或API
7. 常量使用大写+下划线方式
8. api路径名使用小写+下划线方式
9. `单体资源`（如`components, pages, layouts, store, Router`中的组件以及包内不对外直接使用的基类`models/Model.js, services/Service.js`）使用`export default`形式导出，这样便于按场景重复使用
10. 第三方代码，统一放在plugins目录
11. web-component元素按小写+中划线方式，名称要具有描述性，同时体现页面结构，除页面层外，下层组件应该含带上层组件

