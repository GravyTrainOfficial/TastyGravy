const router = require('express').Router()
const { Order, LineItem } = require('../db/models')
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
    const { lineItems } = req.body
    // TODO: add authentications:
    // -lineItems exist in database
    // -all line item user IDs are the current user
    // -all line items have an orderId of null
    const datePurchased = new Date()
    const newOrder = await Order.create({ datePurchased })
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