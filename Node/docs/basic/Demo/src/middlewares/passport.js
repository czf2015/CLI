
const passport = require('koa-passport')
const { Strategy } = require('passport-local')
const User = require('../models/User.js')

// Serialize user
// 将环境中的user.id序列化到session中，即sessionID，同时它将作为凭证存储在用户cookie中。
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Deserialize user from session
// 从session反序列化，参数为用户提交的sessionID，若存在则从数据库中查询user并存储与req.user中。
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// [passport-local](https://github.com/jaredhanson/passport-local)
passport.use(new Strategy((username, password, done) => {
    const criteria = (username.indexOf('@') === -1) ? { username } : { email: username };
    User.findOne(criteria, (err, user) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false, '用户不存在') }
        if (!user.verifyPassword(password)) { return done(null, false, '密码不匹配'); }
        return done(null, user);
    })
}))

module.exports = passport