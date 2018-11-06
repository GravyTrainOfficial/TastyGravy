import axios from 'axios'

const initialState = []

/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'

/**
 * ACTION CREATORS
 */

export const addToCart = item => {
  return {
    type: ADD_TO_CART,
    item
  }
}

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
}

export const gotAllItems = items => {
  return {
    type: GET_ALL_ITEMS,
    items
  }
}

export const updateItemQuantity = updatedItem => {
  return {
    type: UPDATE_CART_ITEM,
    updatedItem
  }
}

/**
 * THUNK CREATORS
 */

export const getAllItems = () => {
  // componenentDidMount?
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/line-items/cart')
      dispatch(gotAllItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const modifyLineItem = (item) => { //product, productId, and quantity from form
  console.log('in modifyLineItem thunk')
  return async dispatch => {
    try {
      const { data } = await axios.put('/api/line-items', item)
      console.log('in the dispatch for modifyLineItem; data received from put request: ', data)
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addLineItem = (item, cart) => { // product, productId, and quantity
  console.log('in addLineItem thunk')
  const possibleCartItem = cart.find((entry) => entry.productId === item.productId)
  if (!possibleCartItem) {
    console.log('correct thunk, no previous cart item')
    return async dispatch => { //this also accepts arg is 'get state' maybe use it?
      try {
        const { data } = await axios.post('/api/line-items', item);
        console.log('in the dispatch for addLineItem; data received from post request: ', data)
        dispatch(addToCart(data))
      } catch (error) {
        console.error(error)
      }
    }
  } else {
    console.log('uh oh, this already exists in the cart! switching to modifyLineItem thunk...')
    return modifyLineItem(item) // don't call another thunk here! ****************
  }
}

export const removeLineItem = (productId) => { //just need productId here
  return async dispatch => {
    try {
      await axios.delete(`/api/line-items/${productId}`);
      dispatch(removeFromCart(productId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const modifyLineItem = (item) => { //product, productId, and quantity from form
  // const possibleCartItem = cart.find((entry) => entry.productId === item.productId)
  // if (possibleCartItem) {
  //   return async dispatch => {
  //     try {
  //       console.log('update')
  //       const { data } = await axios.put('/api/line-items', item)
  //       dispatch(updateItemQuantity(data))
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }
  console.log('in modifyLineItem thunk')
  return async dispatch => {
    try {
      const { data } = await axios.put('/api/line-items', item)
      console.log('in the dispatch for modifyLineItem; data received from put request: ', data)
      dispatch(updateLineItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}


/**
 * REDUCER
 */

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [action.item, ...state]
    case REMOVE_FROM_CART:
      return state.filter(item => item.productId !== action.productId)
    case GET_ALL_ITEMS:
      return action.items
    case UPDATE_CART_ITEM:
      return [
        ...state.filter(cartItem => cartItem.productId !== action.updatedItem.productId),
        action.updatedItem
      ]
    default:
      return state
  }
}
