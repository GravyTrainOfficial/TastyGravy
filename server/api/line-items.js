const router = require('express').Router()
const { Order, LineItem } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLineItems = await LineItem.findAll()
    res.json(allLineItems)
  } catch (err) {
    next(err)
  }
})

// May be put in its own cart API route?
router.get('/cart', async (req, res, next) => {
  try {
    let cartItems
    if (req.user) {
      cartItems = await LineItem.findAll({
        where: {
          userId: req.user.id,
          status: 'cart'
        }
      })
    }
    // else get the cart from the session? does that belong here?
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { quantity, productId } = req.body
    let newItemData = { quantity, productId }
    if (req.user) {
      newItemData.userId = req.user.id
      const newItem = await LineItem.create({
        ...newItemData,
        status: 'cart',
        userId: req.user.id
      })
      res.json(newItem)
    } else {
      if (!req.session.cart) req.session.cart = []
      req.session.cart.push(newItemData)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const { quantity, productId } = req.body
    if (req.user) {
      const oldItemQuantity = LineItems.findOne({
        where: { id: itemId },
        attributes: ['quantity']
      })
      const updatedItem = await LineItem.update({ quantity: oldItemQuantity + quantity })
      res.json(newItem)
    } else {
      const oldItem = req.session.cart.find(item => item.productId === productId)
      oldItem.quantity += quantity
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    await LineItem.destroy({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
