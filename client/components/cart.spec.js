// import {expect} from 'chai'
// import {addLineItem} from './cart'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('Cart Thunk Creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('add to cart', () => {
//     it('eventually dispatches the ADD_TO_CART action', async () => {
//       const fakeItem = {
//         product: 'Test Product',
//         productId: 100000,
//         quantity: 500
//       }
//       const cart = []
//       mockAxios.onPost('api/line-items').replyOnce(fakeItem, cart)
//       await store.dispatch(addLineItem(fakeItem, cart))
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('ADD_TO_CART')
//       expect(actions[0].item).to.be.deep.equal(fakeItem)
//     })
//   })
// })
