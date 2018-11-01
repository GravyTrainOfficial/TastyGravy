const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['cart', 'purchased', 'shipped', 'received'],
    defaultValue: 'cart'
  }
})

module.exports = LineItem