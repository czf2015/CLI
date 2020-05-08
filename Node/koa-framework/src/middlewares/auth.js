module.exports = ctx => {
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user
        ctx.body = {
            username,
            email
        }
    } else {
        ctx.body = {
            username: '',
            email: ''
        }
    }
}