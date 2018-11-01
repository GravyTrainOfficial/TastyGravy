/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/orders/', () => {
    const datePurchased = new Date()

    beforeEach(() => {
      return Order.create({
        datePurchased
      })
    })

    it('GET /api/orders responds with the correct fields', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].datePurchased).to.be.equal(datePurchased)
    })

    // TODO: test with assigned LineItems
  }) // end describe('/api/orders')

  // TODO: test other routes

}) // end describe('Order routes')
