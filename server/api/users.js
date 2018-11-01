const router = require('express').Router()
const { User, Order } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email', 'role']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }
      // include purchase history when modeled
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/orders/:userId', async (req, res, next) => {
  const { userId } = req.params
  if (req.user.id === userId || req.user.role === 'admin') { // ???
    try {
      const orders = await Order.findAll({
        where: { userId },
        include: [ LineItem ]
      })
      res.json(orders)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(403).send()
  }
})