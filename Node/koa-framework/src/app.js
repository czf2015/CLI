// https://koa.bootcss.com
const Koa = require('koa')
const staticServer = require('koa-static')
const templateParser = require('koa-views')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
// https://github.com/rkusa/koa-passport#usage
const passport = require('./middlewares/passport.js')
const redisStore = require('koa-redis')


const app = new Koa()

app.proxy = true
// 设置Cookie密钥
app.keys = ['czf', 'secret']

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
app.use(session({ key: 'czf', prefix: 'czf:uid', store: redisStore() }))
app.use(passport.initialize())
app.use(passport.session())

// 指定视图模板路径及默认模板渲染引擎
app.use(templateParser(`${__dirname}/../views`, {
    extension: 'ejs',
}))
// 提供静态资源文件服务
app.use(staticServer(`../${__dirname}/../static`))

module.exports = app
