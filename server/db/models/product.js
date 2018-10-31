const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image_Url: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn.shopify.com/s/files/1/2382/0223/products/30873-1_73d9e0c4-6737-4d59-a425-35536ad6c131_200x200.jpg?v=1526529402',
    allowNull: false
   }
})

module.exports = Product
