const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const LineItem = require('./line-item')

LineItem.belongsTo(Product)
LineItem.belongsTo(User)
LineItem.belongsTo(Order)
User.hasMany(LineItem)
Order.hasMany(LineItem)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  LineItem
}
