/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const LineItem = db.model('lineitem')

describe('LineItem routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/line-items/', () => {
    const quantity = 10
    const status = 'purchased'

    beforeEach(() => {
      return LineItem.create({
        quantity,
        status
      })
    })

    it('GET /api/line-items responds succcessfully', async () => {
      const res = await request(app)
        .get('/api/line-items')
        .expect(200)
        
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(quantity)
      expect(res.body[0].status).to.be.equal(status)
    })

    // TODO: test assignment to a test-user and test-product
  }) // end describe('/api/line-items')

  // TODO: test other routes

}) // end describe('LineItem routes')
