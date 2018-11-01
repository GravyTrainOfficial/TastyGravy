const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
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
    if (req.user) {
      const newItem = await LineItem.create({
        quantity,
        status: 'cart',
        productId,
        userId: req.user.id
      })
      res.json(newItem)
    } else {
      res.status(403).send()
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
      res.status(403).send()
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
