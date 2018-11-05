import axios from 'axios'

// Products Actions
const GET_ALL_PRODUCTS_FROM_SERVER = 'GET_ALL_PRODUCTS_FROM_SERVER'
const GET_SINGLE_PRODUCT_FROM_SERVER = 'GET_SINGLE_PRODUCT_FROM_SERVER'
const GET_FILTERED_PRODUCTS_FROM_SERVER = 'GET_FILTERED_PRODUCTS_FROM_SERVER'
const ADD_PRODUCT_TO_SERVER = 'ADD_PRODUCT_TO_SERVER'

// Products initial State
const initialState = {
  products: [],
  singleProduct: {},
  categories: []
}

// Products action creators
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

export const addedProductToServer = product => {
  return {
    type: ADD_PRODUCT_TO_SERVER,
    product
  }
}


// Products Thunks
export const fetchProductData = function () {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    const categories = products.reduce((total, current) => {
      if (!total.includes(current.category)) {
        total.push(current.category)
      }
      return total
    }, ['All'])
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

export const addProduct = function (product) {
  console.log(`in addproduct thunk`)
  return async dispatch => {
    await axios.post('/api/products', product)
    const action = addedProductToServer(product)
    dispatch(action)
  }
}


// Products Reducers
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
