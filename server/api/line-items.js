const router = require('express').Router()
const axios = require('axios')
const {Order, LineItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLineItems = await LineItem.findAll({
      include: [{all: true}]
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
    const {quantity, productId} = req.body
    if (quantity < 1) res.status(403).send()
    let newItemData = {quantity, productId}
    const associatedProduct = await Product.findOne({where: {id: productId}})
    if (req.user) {
      newItemData.userId = req.user.id
      const possibleOldItem = await LineItem.findOne({
        where: {
          productId,
          userId: req.user.id,
          status: 'cart'
        }
      })
      if (possibleOldItem) {
        res.json(await axios.put('/api/line-items/', {quantity, productId}))
      }
      const newItem = await LineItem.create({
        ...newItemData,
        status: 'cart',
        userId: req.user.id
      })
      newItem.dataValues.product = associatedProduct
      res.json(newItem)
    } else {
      if (!req.session.cart) req.session.cart = []
      const possibleOldItem = req.session.cart.find(
        item => item.productId === productId
      )
      if (possibleOldItem) {
        res.json(await axios.put('/api/line-items/', {quantity, productId}))
      }
      newItemData.product = associatedProduct
      req.session.cart.push(newItemData)
      res.json(newItemData)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:itemId', async (req, res, next) => {
  try {
    const {quantity} = req.body
    if (req.user) {
      const oldItemQuantity = await LineItem.findOne({
        where: {id: req.params.itemId},
        attributes: ['quantity']
      })
      const newQuantity = oldItemQuantity.dataValues.quantity + quantity
      const updatedItem = await LineItem.update(
        {quantity: newQuantity},
        {
          where: {id: req.params.itemId},
          returning: true,
          plain: true
        }
      )
      updatedItem[1].dataValues.product = await Product.findOne({
        where: {id: 1}
      })
      res.json(updatedItem[1])
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})

// router.put('/', async (req, res, next) => {
//   try {
//     const { quantity, productId } = req.body
//     const associatedProduct =  await Product.findOne({ where: { id: productId } })
//     if (req.user) {
//       const oldItem = LineItems.findOne({
//         where: {
//           productId,
//           userId: req.user.id,
//           status: 'cart'
//         }
//       })
//       const oldQuantity = oldItem.dataValues.quantity
//       if (oldQuantity - quantity < 0) { // If the edit would make the quantity negative
//         res.status(403).send() //temporary; probably do more
//       }
//       if (oldQuantity - quantity === 0) { // If the edit would make the quantity zero
//         res.json(await axios.delete(`/api/line-items/${oldItem.dataValues.id}`))
//       }
//       const updatedItem = await LineItem.update({ quantity: oldQuantity + quantity },
//         { where: { id: oldItem.id } })
//       updatedItem.dataValues.product = associatedProduct
//       res.json(updatedItem)
//     } else {
//       const itemToUpdate = req.session.cart.find(item => item.productId === productId)
//       if (itemToUpdate.quantity - quantity < 0) res.status(403).send()
//       itemToUpdate.quantity += quantity
//       itemToUpdate.product = associatedProduct
//       res.json(itemToUpdate)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.delete('/:itemId', async (req, res, next) => {
  try {
    if (req.user) {
      await LineItem.destroy({where: {id: req.params.id}})
    } else {
      const item = req.session.cart.find(item => item.productId)
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
