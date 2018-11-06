const router = require('express').Router()
module.exports = router
const stripe = require("stripe")("sk_test_vdFxdXGq22vnZybYmHEUZVJC")
const { Order, LineItem, Product, User } = require('../db/models')

const createOrder = async (req, next) => {
  try {
    let guestUser, lineItems
    if (!req.user) {
      guestUser = await User.find({ where: { email: req.session.email } })
      console.log('GUES USER AAAAAAAAAAAAAAA', guestUser)
      if (!guestUser) guestUser = await User.create({ email: req.session.email })
      lineItems = await LineItem.bulkCreate(req.session.cart)
      req.session.cart = []
    } else {
      lineItems = await LineItem.findAll(
        {
          where: {
            userId: req.user.id,
            status: 'cart'
          }
        })
    }
    //if the user is a guest, create the actual line items in the db
    //else, the relevant line items are already in the db as the user's line items of status cart
    // const userId = req.user.id || guestUser.dataValues.id
    let userId
    if (req.user) userId = req.user.id
    else userId = guestUser.dataValues.id
    const datePurchased = new Date() // ************ empty model possible here. line not needed 
    console.log('STUFF STUFF STUFF', datePurchased, userId)
    const newOrder = await Order.create({ datePurchased, userId })
    console.log(newOrder)  //


    lineItems.forEach(async item => {
      await LineItem.update({
        orderId: newOrder.id,
        status: 'purchased'
      },
        { where: { id: item.id } })
      // const { inventoryQuantity: oldInventoryQuantity } = await Product.findOne({
      //   where: { id: item.productId },
      //   attributes: ['inventoryQuantity']
      // })
      // const newInventoryQuantity = oldInventoryQuantity - item.quantity
      // await Product.update(
      //   { inventoryQuantity: newInventoryQuantity },
      //   { where: { id: item.productId } }
      // )
      //*********OR instead of the above 9 lines:*********
      const associatedProduct = await Product.findOne({ where: { id: item.productId } })
      console.log(associatedProduct.dataValues.inventoryQuantity)
      associatedProduct.changeInventory(-item.quantity)
      console.log(associatedProduct.dataValues.inventoryQuantity)
    }
    )
    return newOrder.dataValues
  } catch (err) {
    next(err)
  }
}


router.post("/", async (req, res, next) => {

  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,  //req.body.amount
      currency: "usd",
      description: "Tasty Gravy", //req.body.somedescription
      source: req.body.token.id // req.body.token.id
    })

    let possibleNewOrder = null
    if (status === 'succeeded') {
      possibleNewOrder = await createOrder(req, next)
      console.log('Possible new order: ', possibleNewOrder)
    }

    res.json({ status, possibleNewOrder })
  } catch (err) {
    next(err)
  }
});
