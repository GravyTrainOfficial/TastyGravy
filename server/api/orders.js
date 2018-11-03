const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
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

// Route for assigning un-ordered line items to an order, used when purchasing
// Confused about its implementation, but I can't test it:
router.post('/', async (req, res, next) => {
  try {
    // const { lineItems } = req.body
    //OR:
    const userId = req.user.id || req.body.userId
    const lineItems = LineItem.findAll({ where: {
      status: 'cart',
      userId
    } })
    const datePurchased = new Date()
    const newOrder = await Order.create({ datePurchased, userId })
    newOrder.setLineItems(lineItems) //Needs to be awaited? Do I need to save the models now? 
    // lineItems.forEach(item => {
    //   item.orderId = newOrder.id
    // }) // Just in case the magic methods don't work
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    // TODO: ONLY ADMINS OR THE RELEVANT USER HAVE PERMISSION
    const order = await Order.findOne({
      where: { id: req.params.orderId },
      include: [{
        model: LineItem,
        include: [Product]
      }]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})