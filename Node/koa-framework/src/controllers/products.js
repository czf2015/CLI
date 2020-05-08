
const Router = require('koa-router')
const Product = require('../models/Product.js')
const { query } = require('../middleware/receive.js')

const router = new Router({
  prefix: '/products'
})

router
  .get('/', query(Product, true))
  .get('/:id', query(Product))

module.exports = router