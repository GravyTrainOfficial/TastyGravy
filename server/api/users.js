const router = require('express').Router()
const { User, Order, LineItem, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'firstName', 'lastName', 'email', 'role']
      })
      res.json(users)
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})

router.get('/guest-email', async (req, res, next) => {
  try {
    res.send(req.session.email)
  } catch (err) {
    next(err)
  }
})

router.post('/guest-email', async (req, res, next) => {
  try {
    req.session.email = req.body.email
    res.send(req.session.email)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    if (req.user.role === 'admin' || req.user.id === userId) {
      const user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'firstName', 'lastName', 'email', 'role']
      })
      res.json(user)
  } else {
    res.status(403).send()
  }
  } catch (err) {
    next(err)
  }
})

router.get('/orders/me', async (req, res, next) => {
  if (req.user) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: LineItem,
            include: [Product]
          }
        ]
      })
      res.json(orders)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(403).send() // change status code?
  }
})

router.get('/orders/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params
    if (req.user.id === userId || req.user.role === 'admin') {
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: LineItem,
            include: [Product]
          }
        ]
      })
      res.json(orders)
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})
