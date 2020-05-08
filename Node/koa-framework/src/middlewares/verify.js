// [郵箱驗證](https://nodemailer.com/about/)
// [短信驗證](https://blog.csdn.net/ziwoods/article/details/77878594?utm_source=blogxgwz2)
const nodemailer = require('nodemailer')
const { store, smtp } = require('../config')

module.exports = async (ctx, next) => {
    const { username, email } = ctx.request.body
    const saveExpire = await store.hget(`nodemail:${username}`, 'expire')

    if (saveExpire && new Date().getTime() < saveExpire) {
        ctx.body = {
            code: -1,
            msg: '验证请求过于频繁，1分钟内1次'
        }
        return false
    }

    // https://github.com/nodemailer/nodemailer/blob/master/examples/oauth2.js
    const { host, user, pass, expire, code } = smtp

    const transporter = nodemailer.createTransport({
        host,
        auth: {
            user,
            pass
        }
    })

    const mail = {
        from: `"认证邮件" <${user}>`,
        to: email,
        subject: 'track注册码',
        html: `您在"track网站"中注册，您的邀请码是${code}`
    }

    await transporter.sendMail(mail, (err, mail) => {
        if (err) return
        store.hmset(`nodemail:${username}`, { expire, code })
        transporter.close()
    })

    ctx.body = {
        code: 0,
        msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
}