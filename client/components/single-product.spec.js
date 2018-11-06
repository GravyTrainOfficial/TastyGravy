// import { expect } from 'chai'
// import React from 'react'
// import enzyme, { shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import { SingleProduct } from './single-product'
// import { fetchSingleProduct } from '../store/products'
// import { addLineItem, modifyLineItem, getAllItems } from '../store/cart'
// import { formatPrice } from '../util'

// const adapter = new Adapter()
// enzyme.configure({ adapter })

// describe('SingleProduct', () => {
//   let singleProduct
//   let props
//   let match = {
//     params: {
//       productId: 2
//     }
//   }
//   let dummyProduct2 = {
//     id: 2,
//     name: 'Dummy product2',
//     description:
//       'Dummy product description',
//     category: 'dummy',
//     price: 100,
//     inventoryQuantity: 100,
//     image_URL: 'https://images-platform.99static.com/_f6fEohTeGyuGk35pxZRacYcSWA=/500x500/top/smart/99designs-contests-attachments/19/19090/attachment_19090303'
//   }

//   beforeEach(() => {
//     singleProduct = shallow(<SingleProduct product={dummyProduct2} match={match} />)
//   })

//   it('renders the name in an h1', () => {
//     expect(singleProduct.find('h1').text()).to.be.equal('Dummy product2')
//   })
// })