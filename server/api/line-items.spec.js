/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const LineItem = db.model('lineitem')
const User = db.model('user')

describe('LineItem routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/line-items/', () => {
    const itemInCart = {
      quantity: 10,
      status: 'cart'
    }
    const itemNotInCart = {
      quantity: 3 
    }
    const userCredentials = {
      email: 'admin@admin.com',
      password: 'test',
      role: 'admin'
    }
    const authenticatedUser = request.agent(app)

    beforeEach((done) => {
      const user = User.create(userCredentials)
      // const userId = user.id
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(200);
        // expect('Location', '/home');
        done();
      });
      // const user = User.findOne({where: {email: userCredentials.email}})
      LineItem.create({...itemInCart, userId: user.id})
      LineItem.create(itemNotInCart)
    })

    it('GET /api/line-items responds successfully', async () => {
      const res = await request(app)
        .get('/api/line-items')
        .expect(200)
        
      expect(res.body).to.be.an('array')
      expect(res.body[1].quantity).to.be.equal(itemNotInCart.quantity)
      expect(res.body[1].status).to.be.equal(itemNotInCart.status)
    })

    it('GET /api.line-items/cart responds with user cart', async () => {
      const user = User.findOne({where: {email: userCredentials.email}})
      const userId = user.id
      const res = await request(app)
        .get('/api/line-items/cart')
        .expect(200)

        expect (res.body).to.be.an('array')
        expect (res.body[0].quantity).to.be.equal(itemInCart.quantity)
        expect (res.body[0].status).to.be.equal(itemInCart.status)
        expect (res.body[0].userId).to.be.equal(userId)
    })

    it('POST /api/line-items creates and responds successfully')

    // TODO: test assignment to a test-user and test-product
  }) // end describe('/api/line-items')

  // TODO: test other routes

}) // end describe('LineItem routes')
