const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
      if (req.user.role === 'admin') {
      const allOrders = await Order.findAll({
      })
      res.json(allOrders)
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})

// Route for assigning un-ordered line items to an order, used when purchasing, AFTER payment
// Confused about its implementation, but I can't test it:
router.post('/', async (req, res, next) => {
  try {
    const { lineItemData } = req.body
    const userId = req.user.id || req.body.userId
    let lineItems
    // const lineItems = LineItem.findAll({ where: {
    //   status: 'cart',
    //   userId
    // } })
    const datePurchased = new Date()
    const newOrder = await Order.create({ datePurchased, userId })

    //if the user is a guest, create the actual line items in the db
    //else, the relevant line items are just what's passed in already
    if (!req.user) {
      lineItems = await LineItem.bulkCreate(lineItemData)
    } else {
      lineItems = lineItemData
    }
    // newOrder.setLineItems(lineItems) //Needs to be awaited? Do I need to save the models now? 
    lineItems.forEach(item => {
      await LineItem.update({orderId: newOrder.id},
      {where: {id: item.id}})
      const oldQuantity = await Product.findOne({
        where: {id: item.productId},
        attributes: ['quantity']
      })
      const newQuantity = oldQuantity - item.quantity
      await Product.update(
        {inventoryQuantity: newQuantity},
        {where: {id: item.productId}}
      )
    }) // Just in case the magic methods don't work
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
    if (req.user.id === order.userId || req.user.role === 'admin') {
      res.json(order)
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})