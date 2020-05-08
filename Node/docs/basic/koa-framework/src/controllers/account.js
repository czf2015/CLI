
const Router = require('koa-router')
const register = require('../middleware/register.js')
const login = require('../middleware/login.js')
const logout = require('../middleware/logout.js')
const verify = require('../middleware/verify.js')
const auth = require('../middleware/auth.js')

const router = new Router({
  prefix: '/account'

})

router
  .post('/register', register)
  .post('/login', login)
  .get('/logout', logout)
  .post('/verify', verify)
  .get('/auth', auth)

module.exports = router