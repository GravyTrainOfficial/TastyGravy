const router = require('express').Router()
module.exports = router
// please work please please work
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/line-items', require('./line-items'))
router.use('/charge', require('./charge'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
