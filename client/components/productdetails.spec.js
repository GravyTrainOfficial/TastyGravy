import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ProductDetails } from './productdetails'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('ProductDetails', () => {
  let productDetails
  let dummyProduct = {
    id: 1,
    name: 'Dummy product',
    description:
      'Dummy product description',
    category: 'dummy',
    price: 100,
    inventoryQuantity: 100,
    image_URL: 'https://images-platform.99static.com/_f6fEohTeGyuGk35pxZRacYcSWA=/500x500/top/smart/99designs-contests-attachments/19/19090/attachment_19090303'
  }

  beforeEach(() => {
    productDetails = shallow(<ProductDetails product={dummyProduct} key={dummyProduct.id} />)
  })

  it('renders the name in an h3', () => {
    expect(productDetails.find('h3').text()).to.be.equal('Dummy product')
  })
})
