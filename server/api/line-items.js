const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLineItems = await LineItem.findAll({
      include: [{ all: true }]
    })
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
        },
        include: [Product]
      })
    } else {
      cartItems = req.session.cart || []
    }
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { quantity, productId } = req.body
    let newItemData = { quantity, productId }
    const associatedProduct =  await Product.findOne({ where: { id: productId } })
    if (req.user) {
      newItemData.userId = req.user.id
      const newItem = await LineItem.create({
        ...newItemData,
        status: 'cart',
        userId: req.user.id
      })
      newItem.dataValues.product = associatedProduct
      res.json(newItem)
    } else {
      if (!req.session.cart) req.session.cart = []
      newItemData.product = associatedProduct
      req.session.cart.push(newItemData)
      res.json(newItemData)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const { quantity, productId } = req.body
    const associatedProduct =  await Product.findOne({ where: { id: productId } })
    if (req.user) {
      const oldItem = LineItems.findOne({
        where: {
          productId,
          userId: req.user.id,
          status: 'cart'
        }
      })
      const updatedItem = await LineItem.update({ quantity: oldItem.quantity + quantity },
        { where: { id: oldItem.id } })
      updatedItem.dataValues.product = associatedProduct
      res.json(updatedItem)
    } else {
      const itemToUpdate = req.session.cart.find(item => item.productId === productId)
      itemToUpdate.quantity += quantity
      itemToUpdate.product = associatedProduct
      res.json(itemToUpdate)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    if (req.user) {
      await LineItem.destroy({ where: { id: req.params.id } })
    } else {
      const item = req.session.cart.find(item => item.productId)
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
