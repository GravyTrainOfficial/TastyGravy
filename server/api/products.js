const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
    })
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId }
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/categories/:category', async (req, res, next) => {
  try {
    let filteredProducts
    if (req.params.category === 'All') {
      filteredProducts = await Product.findAll()
    } else {
      filteredProducts = await Product.findAll({
        where: {
          category: req.params.category
        }
      })
    }
    res.json(filteredProducts)
  } catch (err) {
    next(err)
  }
})