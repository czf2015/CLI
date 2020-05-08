const store = require('koa-redis')()
const db = require('mongoose')

db.connect('mongodb://127.0.0.1:27017/track', {
    useNewUrlParser: true
})

module.exports = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
    keys: ['czf', 'secret'],
    session: { key: 'czf', prefix: 'czf:uid', store },
    db,
    store,
    smtp: {
        get host() {
            return 'smtp.qq.com'
        },
        get user() {
            return '122385930@qq.com'
        },
        get pass() {
            return '***********' // 邮箱设置里面
        },
        get code() {
            return Math.random().toString(16).slice(2, 6).toUpperCase()
        },
        get expire() {
            return new Date().getTime() + 60 * 1000
        }
    },
}