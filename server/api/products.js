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

router.post('/', async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { name, description, category, price, inventoryQuantity, image_URL } = req.body
      // TODO: CHECK IF PRODUCT ALREADY EXISTS; ALERT AND ASK TO REDIRECT TO PUT?
      const newProduct = await Product.create({
        name, 
        description,
        category,
        price,
        inventoryQuantity,
        image_URL
        })
      res.json(newProduct)
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { name, description, category, price, inventoryQuantity, image_URL } = req.body
      const updatedProduct = await Product.update({
        name, 
        description,
        category,
        price,
        inventoryQuantity,
        image_URL
        }, {
          where: { id: req.params.productId }
        })
      res.json(updatedProduct)
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      await Product.destroy({ where: { id: req.params.productId } })
      res.status(204).end()
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})