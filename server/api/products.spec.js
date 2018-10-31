/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products/', () => {
    const productName = 'Funky Gravy'
    const description = 'The James Brown of gravy'
    const category = 'lumpy'

    beforeEach(() => {
      return Product.create({
        name: productName,
        description,
        category
      })
    })

    it('GET /api/products returns the correct name', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productName)
    })

    it('GET /api/products returns the correct description', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(description)
    })

    it('GET /api/products returns the correct category', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].category).to.be.equal(category)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
