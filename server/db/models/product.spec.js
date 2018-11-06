const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {
    describe('changeInventory', () => {
      let carrot

      beforeEach(async () => {
        carrot = await Product.create({
          name: 'Carrot',
          price: 100000,
          inventoryQuantity: 10
        })
      })

      it('changes the inventory by the amount specified', () => {
        carrot.changeInventory(5)
        expect(carrot.inventoryQuantity).to.be.equal(15)
        carrot.changeInventory(-8)
        expect(carrot.inventoryQuantity).to.be.equal(7)
      })
    }) // end describe('changeInventory')
  }) // end describe('instanceMethods')
}) // end describe('User model')