module.exports = {
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
}