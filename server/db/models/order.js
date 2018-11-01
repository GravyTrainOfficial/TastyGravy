const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  datePurchased: { // MAY NOT BE NECESSARY; since an order is only created on purchase,
    type: Sequelize.DATE, // the automatic "date created" can serve as this
    allowNull: false
  } 
})

module.exports = Order