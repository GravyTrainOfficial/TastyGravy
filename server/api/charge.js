const router = require('express').Router()
module.exports = router
const stripe = require("stripe")("sk_test_vdFxdXGq22vnZybYmHEUZVJC");


router.post("/", async (req, res) => {

  try {
    let { status } = await stripe.charges.create({
      amount: 2000,  //req.body.amount
      currency: "usd",
      description: "An example charge", //req.body.somedescription
      source: req.body // req.body.token.id
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});
