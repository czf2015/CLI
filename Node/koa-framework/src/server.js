// https://koa.bootcss.com
const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
// 日志消息
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const config = require('./config')
// https://github.com/rkusa/koa-passport#usage
const passport = require('./middleware/passport.js')

const app = new Koa()

app.proxy = true
// 设置Cookie密钥
app.keys = config.keys

// request.body解析支持类型
app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))

// 路由
require('fs').readdirSync('controllers').forEach(item => {
    const router = require(`./controllers/${item}`)
    app.use(router.routes())
        .use(router.allowedMethods())
})

// koa中间件介绍：https://github.com/koajs/koa/blob/master/docs/guide.md
app.use(session(config.session))
app.use(passport.initialize())
app.use(passport.session())

// 指定视图模板路径及默认模板渲染引擎
app.use(views(`${__dirname}/../views`, {
    extension: 'ejs',
}))
// 提供静态资源文件服务
app.use(static(`../${__dirname}/../static`))

app.listen(config.port, config.host)

consola.ready({
    message: `Server listening on http://${config.host}:${config.port}`,
    badge: true
})
