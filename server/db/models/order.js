const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define({
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order