import axios from 'axios'

const GET_ALL_PRODUCTS_FROM_SERVER = 'GET_ALL_PRODUCTS_FROM_SERVER'
const GET_SINGLE_PRODUCT_FROM_SERVER = 'GET_SINGLE_PRODUCT_FROM_SERVER'
const GET_FILTERED_PRODUCTS_FROM_SERVER = 'GET_FILTERED_PRODUCTS_FROM_SERVER'

const initialState = {
  products: [],
  singleProduct: {},
  categories: []
}

export const getAllProductsFromServer = (products, categories) => {
  return {
    type: GET_ALL_PRODUCTS_FROM_SERVER,
    products,
    categories
  }
}

export const getIndividualProductFromServer = singleProduct => {
  return {
    type: GET_SINGLE_PRODUCT_FROM_SERVER,
    singleProduct
  }
}

export const getFilteredProductsFromServer = filteredProducts => {
  return {
    type: GET_FILTERED_PRODUCTS_FROM_SERVER,
    filteredProducts
  }
}

export const fetchProductData = function () {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    const categories = products.reduce((total, current) => {
      if (!total.includes(current.category)) {
        total.push(current.category)
      }
      return total
    }, [])
    const action = getAllProductsFromServer(products, categories)
    dispatch(action)
  }
}

export const fetchSingleProduct = function (productId) {
  return async dispatch => {
    const response = await axios.get(`/api/products/${productId}`)
    const singleProduct = response.data
    const action = getIndividualProductFromServer(singleProduct)
    dispatch(action)
  }
}

export const fetchFilteredProducts = function (category) {
  return async dispatch => {
    const response = await axios.get(`/api/products/categories/${category}`)
    const filteredProducts = response.data
    const action = getFilteredProductsFromServer(filteredProducts)
    dispatch(action)
  }
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_FROM_SERVER:
      return {
        ...state,
        products: action.products,
        categories: action.categories
      }
    case GET_SINGLE_PRODUCT_FROM_SERVER:
      return {
        ...state,
        singleProduct: action.singleProduct
      }
    case GET_FILTERED_PRODUCTS_FROM_SERVER:
      return {
        ...state,
        products: action.filteredProducts
      }
    default:
      return state
  }
}
