import axios from 'axios'

const GET_ALL_PRODUCTS_FROM_SERVER = 'GET_ALL_PRODUCTS_FROM_SERVER'
const GET_SINGLE_PRODUCT_FROM_SERVER = 'GET_SINGLE_PRODUCT_FROM_SERVER'
const GET_CATEGORY_FROM_SERVER = 'GET_CATEGORY_FROM_SERVER'

const initialState = {
  products: [],
  singleProduct: {},
  category: null
}

export const getAllProductsFromServer = products => {
  return {
    type: GET_ALL_PRODUCTS_FROM_SERVER,
    products
  }
}

export const getIndividualProductFromServer = singleProduct => {
  return {
    type: GET_SINGLE_PRODUCT_FROM_SERVER,
    singleProduct
  }
}

export const getCategoryFromServer = category => {
  return {
    type: GET_CATEGORY_FROM_SERVER,
    category
  }
}

export const fetchProductData = function () {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    const action = getAllProductsFromServer(products)
    dispatch(action)
  }
}

export const fetchSingleProduct = function (productId) {
  return async dispatch => {
    const response = await axios.get(`/api/${productId}`)
    const singleProduct = response.data
    const action = getIndividualProductFromServer(singleProduct)
    dispatch(action)
  }
}

export const fetchCategory = function (categoryId) {
  return async dispatch => {
    const response = await axios.get(`/api/${categoryId}`)
    const category = response.data
    const action = getCategoryFromServer(category)
    dispatch(action)
  }
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_FROM_SERVER:
      return {
        ...state,
        products: action.products
      }
    case GET_SINGLE_PRODUCT_FROM_SERVER:
      return {
        ...state,
        singleProduct: action.singleProduct
      }
    case GET_CATEGORY_FROM_SERVER:
      return {
        ...state,
        category: action.category
      }
    default:
      return state
  }
}
