const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  datePurchased: {
    type: Sequelize.DATE
  }
})

module.exports = Order