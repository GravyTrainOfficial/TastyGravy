/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const LineItem = db.model('lineitem')

xdescribe('LineItem routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/line-items/', () => {
    const quantity = 10
    const productId = 1
    const userCredentials = {
      email: 'heiscool@cool.com',
      password: 'test'
    }
    const authenticatedUser = request.agent(app)

    before(function(done){
      authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          expect('Location', '/home');
          done();
        });
    });

    beforeEach(() => {
      return LineItem.create({
        quantity,
        productId
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

    it('POST /api/line-items creates and responds successfully')

    // TODO: test assignment to a test-user and test-product
  }) // end describe('/api/line-items')

  // TODO: test other routes

}) // end describe('LineItem routes')
