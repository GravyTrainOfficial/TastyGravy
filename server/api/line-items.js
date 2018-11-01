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
    if (req.user) { // will this work?
      cartItems = await LineItem.findAll({
        where: { 
          userId: req.user.id, // ?????
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
