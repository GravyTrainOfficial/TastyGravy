const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
    })
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})