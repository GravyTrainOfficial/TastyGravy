const router = require('express').Router()
const axios = require('axios')
const { Order, LineItem, Product } = require('../db/models')
module.exports = router

const getCartByUserId = async (id) => {
  return await LineItem.findAll({
    where: {
      userId: id,
      status: 'cart'
    },
    include: [Product]
  })
}

const addToCart = async (item, userId) => {
  return await LineItem.create({
    ...item,
    status: 'cart',
    userId
  })
}

const checkQuantity = (newQuantity, args, callback) => {
  if (newQuantity < 0) return 'forbidden'
  else if (newQuantity === 0) return 'delete'
  else return callback(...args)
}

const postUserItem = async (userId, quantity, product, productId) => {
  console.log('user is logged in, posting to database')
  const newItemData = { quantity, productId, userId }
  // const possibleOldItem = await LineItem.findOne({
  //   where: {
  //     productId,
  //     userId: user.id,
  //     status: 'cart'
  //   }
  // })
  const possibleOldItem = (await getCartByUserId(userId))
                            .find(item => item.dataValues.productId === productId)
  if (possibleOldItem) {
    console.log('oh no! this already exists! switching to put route...')
    return editUserItem(possibleOldItem, quantity, product, productId)
  } 

  return checkQuantity(quantity, [userId, newItemData, product], 
    async (userId, data, product) => {
      // const newItem = await LineItem.create({
      //   ...newItemData,
      //   status: 'cart',
      //   userId: req.user.id
      // })
      const newItem = await addToCart(data, userId)
      newItem.dataValues.product = product
      console.log('successfully created new item: ', newItem.dataValues)
      return newItem
    }
  )
}

const postGuestItem = async (cart = [], quantity, product, productId) => {
  console.log('user is not logged in, creating session item')
  const newItemData = { quantity, product, productId }
  if (!cart) cart = [] //redundant, just in case
  const possibleOldItem = cart.find(item => item.productId === productId)
  if (possibleOldItem) {
    console.log('oh no! this already exists! switching to put route...')
    res.json(await axios.put('/api/line-items/', newItemData))
  }
  return checkQuantity(quantity, [cart, newItemData], 
    (cart, newItemData) => {
      cart.push(newItemData)
      console.log('created new item data: ', newItemData, 'and pushed to session cart: ', cart)
      return newItemData
    }
  )
}

const editUserItem = async (oldItem, quantity, product) => {
  console.log('user is logged in, editing database item')
  const { dataValues: { id, quantity: oldQuantity } } = oldItem
  console.log('did the destructuring/finding right and got id and old quantity: ', id, oldQuantity)
  const newQuantity = oldQuantity + quantity
  
  return checkQuantity(newQuantity, [newQuantity, id, product], 
    async (quantity, id, product) => {
      const updatedItem = await LineItem.update({ quantity },
        {
          where: { id },
          returning: true
        })
      updatedItem[1][0].dataValues.product = product
      console.log(updatedItem)
      console.log('successfully updated, array destructured, and assigned product object to the item: ', updatedItem[1][0].dataValues)
      return updatedItem[1][0]
    }
  )
}

const editGuestItem = async (oldItem, quantity, productId) => {
  const newQuantity = oldItem.quantity + quantity
  if (newQuantity < 0) { // If the edit would make the quantity negative
    console.log('the new quantity would be negative! sending 403...')
    res.status(403).send() //temporary; probably do more
  }
  if (newQuantity === 0) { // If the edit would make the quantity zero
    console.log('the new quantity would be zero! gonna delete...')
    res.json(await axios.delete(`/api/line-items/${productId}`))
  }
  oldItem.quantity = newQuantity
  console.log('successfully changed the quantity of itemToUpdate; res.json-ing: ', itemToUpdate)
  res.json(itemToUpdate)
}





router.get('/', async (req, next) => {
  try {
    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
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
      // cartItems = await LineItem.findAll({
      //   where: {
      //     userId: req.user.id,
      //     status: 'cart'
      //   },
      //   include: [Product]
      // })
      cartItems = await getCartByUserId(req.user.id)
    } else {
      cartItems = req.session.cart || []
    }
    return cartItems
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { quantity, product, productId } = req.body
    console.log('in line item api post request; creating quantity of ', quantity)

    let result
    if (req.user) {
      result = await postUserItem(req.user.id, quantity, product, productId)
    } else {
      result = await postGuestItem(req.session.cart, quantity, product, productId)
    }

    if (result === 'forbidden') res.status(403).send()
    else if (result === 'delete') return //DO DELETING
    else res.json(result)
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

router.put('/', async (req, res, next) => {
  try {
    const { quantity, product, productId } = req.body
    console.log('in the put route; adding quantity of: ', quantity)
    console.log('product id and productId: ', product.id, productId)
    if (req.user) {
      console.log('user is logged in')
      const { dataValues: { id, quantity: oldQuantity } } = await LineItem.findOne({
        where: {
          productId,
          userId: req.user.id,
          status: 'cart'
        },
        attributes: ['id', 'quantity']
      })
      console.log('did the destructuring/finding right and got id and old quantity: ', id, oldQuantity)
      const newQuantity = Number(oldQuantity) + quantity
      if (newQuantity < 0) { // If the edit would make the quantity negative
        console.log('the new quantity would be negative! sending 403...')
        res.status(403).send() //temporary; probably do more
      }
      if (newQuantity === 0) { // If the edit would make the quantity zero
        console.log('the new quantity would be zero! gonna delete...')
        res.json(await axios.delete(`/api/line-items/${productId}`))
      }
      // Not a typo! (array destructuring)
      const updatedItem = await LineItem.update({ quantity: newQuantity },
        {
          where: { id },
          returning: true
        })
      updatedItem[1][0].dataValues.product = product
      console.log(updatedItem)
      console.log('successfully updated, array destructured, and assigned product object to the item, res.json-ing: ', updatedItem[1][0].dataValues)
      res.json(updatedItem[1][0])
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
    console.log('in delete route, deleting by productId: ', req.params.productId)
    if (req.user) {
      console.log('user is logged in, destroying entry based on productId, userId, and status cart')
      await LineItem.destroy({
        where: {
          productId: req.params.productId,
          userId: req.user.id,
          status: 'cart'
        }
      })
    } else {
      console.log('user is not logged in, filtering cart. current cart: ', req.session.cart)
      req.session.cart = req.session.cart.filter(item => item.productId !== Number(req.params.productId))
      console.log('filtered session cart: ', req.session.cart)
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
