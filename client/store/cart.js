import axios from 'axios'

const initialState = []

/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const CHECKOUT = 'CHECKOUT'

/**
* ACTION CREATORS
*/

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item
  }
}

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    itemId
  }
}

export const gotAllItems = (items) => {
  return {
    type: GET_ALL_ITEMS,
    items
  }
}

export const checkout = () => {
  return {
    type: CHECKOUT
  }
}
/**
* THUNK CREATORS
*/

export const getAllItems = () => { // componenentDidMount?
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/line-items/cart')
      dispatch(gotAllItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addLineItem = (item) => { // itemId and Quantity in form
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/line-items', item);
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeLineItem = (itemId) => { //just need itemId here
  return async dispatch => {
    try {
      await axios.delete(`/api/line-items/${itemId}`);
      dispatch(removeFromCart(itemId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const checkoutCart = () => {
  return async dispatch => {
    try {
      await axios.put(`/api/line-items/checkout`);
      dispatch(checkout())
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
      return state.filter(item => item.id !== action.itemId)
    case GET_ALL_ITEMS:
      return action.items
    case CHECKOUT:
      return []
    default:
      return state
  }
}