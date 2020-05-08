const axios = require('../utils/axios.js')
const User = require('../models/User.js')
const { store } = require('../config.js')

module.exports = async ctx => {
    // ctx.request.body
    const { username, password, email, code } = ctx.request.body

    if (code) {
        const saveCode = await store.hget(`nodemail:${username}`, 'code')
        const saveExpire = await store.hget(`nodemail:${username}`, 'expire')

        if (code === saveCode) {
            if (new Date().getTime() > saveExpire) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试'
                }
                return false
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }



    const user = await User.find({
        username
    })



    if (user.length) {
        ctx.body = {
            code: -1,
            msg: '已被注册'
        }
        return
    }

    // 创建新账户
    const newUser = await User.create({
        username,
        password,
        email
    })

    if (!newUser) {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    } else {
        axios.post('/account/login', {
            username,
            password
        }).then(res => {
            if (res.data && res.data.code === 0) {
                ctx.body = {
                    code: 0,
                    msg: '注册成功',
                    username: res.data.username
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: res.data.msg
                }
            }
        })
    }
}