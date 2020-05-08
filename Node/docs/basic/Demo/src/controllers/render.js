const Router = require('koa-router')
const render = require('../middlewares/render')
// 参数
const tpl = 'home'
const raw = {title: 'Koa2'}

const router = new Router({
    prefix: '/render',
})

router
    .get('/', render(tpl, raw))

module.exports = router