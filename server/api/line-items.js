const router = require('express').Router()
const axios = require('axios')
const { Order, LineItem, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
      // if (req.user) {
      const allLineItems = await LineItem.findAll({
        include: [{ all: true }]
      })
      res.json(allLineItems)
    } else {
      res.status(403).send()
    }
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
    const { quantity, product, productId } = req.body
    console.log('in line item api post request; creating quantity of ', quantity)
    if (quantity < 1) res.status(403).send()
    if (req.user) {
      console.log('user is logged in, posting to database')
      const newItemData = { quantity, productId, userId: req.user.id }
      const possibleOldItem = await LineItem.findOne({ where: {
        productId,
        userId: req.user.id,
        status: 'cart'
      }})
      if (possibleOldItem) {
        console.log('oh no! this already exists! switching to put route...')
        res.json(await axios.put('/api/line-items/', {...newItemData, product}))
      }
      const newItem = await LineItem.create({
        ...newItemData,
        status: 'cart',
        userId: req.user.id
      })
      newItem.dataValues.product = product
      console.log('successfully created new item, res.json-ing: ', newItem.dataValues)
      res.json(newItem)
    } else {
      console.log('user is not logged in, going to next route')
      next()
    }
  } catch (err) {
    next(err)
  }
})

// secondary post route using sessions for if the user is not logged in
router.post('/', async (req, res, next) => {
  try {
    console.log('in next route for adding session item')
    const { quantity, product, productId } = req.body
    const newItemData = { quantity, product, productId }
    if (!req.session.cart) req.session.cart = []
    const possibleOldItem = req.session.cart.find(item => item.productId === productId)
    if (possibleOldItem) {
      console.log('oh no! this already exists! switching to put route...')
      res.json(await axios.put('/api/line-items/', newItemData))
    }
    req.session.cart.push(newItemData)
    console.log('created new item data: ', newItemData, 'and pushed to session cart: ', req.session.cart, 'res.json-ing')
    res.json(newItemData)
  } catch (err) {
    next(err)
  }
})

// router.put('/', async (req, res, next) => {
//   try {
//     console.log('in the put from the post')
//     const { quantity, productId } = req.body
//     const associatedProduct =  await Product.findOne({ where: { id: productId } })
//     console.log('associatedProduct: ', associatedProduct)
//     if (req.user) {
//       const oldItem = LineItems.findOne({
//         where: {
//           productId,
//           userId: req.user.id,
//           status: 'cart'
//         }
//       })
//       console.log('req.user, oldItem: ', oldItem)
//       const oldQuantity = oldItem.dataValues.quantity
//       console.log('oldQuantity: ', oldQuantity)
//       if (oldQuantity + quantity < 0) { // If the edit would make the quantity negative
//         console.log('the new quantity would be nagative!')
//         res.status(403).send() //temporary; probably do more
//       }
//       if (oldQuantity + quantity === 0) { // If the edit would make the quantity zero
//         console.log('gonna delete!')
//         res.json(await axios.delete(`/api/line-items/${oldItem.dataValues.id}`))
//       } 
//       const updatedItem = await LineItem.update({ quantity: oldQuantity + quantity },
//         { where: { id: oldItem.dataValues.id } })
//       updatedItem.dataValues.product = associatedProduct
//       console.log('updatedItem!!!!: ', updatedItem)
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

router.put('/', async (req, res, next) => {
  try {
    const { quantity, product, productId } = req.body
    console.log('in the put route; adding quantity of: ', quantity)
    if (req.user) {
      console.log('user is logged in')
      const { dataValues: {id, quantity: oldQuantity}} = await LineItem.findOne({
        where: {
          productId,
          userId: req.user.id,
          status: 'cart'
        },
        attributes: ['id', 'quantity']
      })
      console.log('did the destructuring/finding right and got id and old quantity: ', id, oldQuantity)
      const newQuantity = oldQuantity + quantity
      if (newQuantity < 0) { // If the edit would make the quantity negative
        console.log('the new quantity would be negative! sending 403...')
        res.status(403).send() //temporary; probably do more
      }
      if (newQuantity === 0) { // If the edit would make the quantity zero
        console.log('the new quantity would be zero! gonna delete...')
        res.json(await axios.delete(`/api/line-items/${productId}`))
      } 
      // Not a typo! (array destructuring)
      const [, updatedItem] = await LineItem.update({ quantity: newQuantity },
        { where: { id } })
        updatedItem.dataValues.product = product
        console.log('successfully updated, array destructured, and assigned product object to the item, res.json-ing: ', updatedItem.dataValues)
      res.json(updatedItem)
    } else {
      console.log('user is not logged in, going to next route')
      next()
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log('in next route for modifying session item')
    const { quantity, productId } = req.body
    const itemToUpdate = req.session.cart.find(item => item.productId === productId)
    console.log('found the session item to update: ', itemToUpdate)
    const newQuantity = itemToUpdate.quantity + quantity
    if (newQuantity < 0) { // If the edit would make the quantity negative
      console.log('the new quantity would be negative! sending 403...')
      res.status(403).send() //temporary; probably do more
    }
    if (newQuantity === 0) { // If the edit would make the quantity zero
    console.log('the new quantity would be zero! gonna delete...')
    res.json(await axios.delete(`/api/line-items/${productId}`))
    } 
    itemToUpdate.quantity = newQuantity
    console.log('successfully changed the quantity of itemToUpdate; res.json-ing: ', itemToUpdate)
    res.json(itemToUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    console.log('in delete route, deleting by productId: ', productId)
    if (req.user) {
      console.log('user is logged in, destroying entry based on productId, userId, and status cart')
      await LineItem.destroy({ where: { 
        productId: req.params.productId,
        userId: req.user.id,
        status: 'cart'
       } })
    } else {
      console.log('user is not logged in, filtering cart. current cart: ', req.session.cart)
      req.session.cart.filter(item => item.productId !== req.params.productId )
      console.log('filtered session cart: ', req.session.cart)
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
