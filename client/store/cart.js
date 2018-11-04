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

export const removeFromCart = itemId => {
  return {
    type: REMOVE_FROM_CART,
    itemId
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
      const {data} = await axios.get('/api/line-items/cart')
      dispatch(gotAllItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addLineItem = item => {
  // itemId and Quantity in form
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/line-items', item)
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeLineItem = itemId => {
  //just need itemId here
  return async dispatch => {
    try {
      await axios.delete(`/api/line-items/${itemId}`)
      dispatch(removeFromCart(itemId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const modifyLineItem = (item, cart) => {
  // itemId and Quantity in form
  // console.log('item', item)
  // console.log('cart', cart)

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === item.productId) {
      return async dispatch => {
        try {
          console.log('update')
          let response = await axios.put(`/api/line-items/${cart[i].id}`, item)
          dispatch(updateItemQuantity(response.data))
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return async dispatch => {
    try {
      console.log('add')
      const {data} = await axios.post('/api/line-items', item)
      dispatch(addToCart(data))
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
    case UPDATE_CART_ITEM:
      return [
        ...state.filter(cartItem => cartItem.id !== action.updatedItem.id),
        action.updatedItem
      ]
    default:
      return state
  }
}
