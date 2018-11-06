import axios from 'axios'

const CHECK_FOR_GUEST_EMAIL = 'CHECK_FOR_GUEST_EMAIL'
const CREATED_ORDER = 'CREATED_ORDER'

const initialState = {
  guestEmail: '',
  order: null
}

const checkForGuestEmail = email => ({ type: CHECK_FOR_GUEST_EMAIL, email })
const displayNewOrder = order => ({ type: CREATED_ORDER, order})

export const fetchGuestEmail = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/guest-email')
    const action = res.data
    console.log(res.data)
    dispatch(checkForGuestEmail(action))
  } catch (err) {
    console.error(err)
  }
}

export const setGuestEmail = (email) => async dispatch => {
  try {
    const res = await axios.post('/api/users/guest-email', { email })
    const action = res.data
    console.log(res.data)
    dispatch(checkForGuestEmail(action))
  } catch (err) {
    console.error(err)
  }
}

export const enterStripe = (data) => async dispatch => {
  try {
    const res = await axios.post('api/charge', data)
    const action = res.possibleNewOrder
    console.log(action)
    dispatch(displayNewOrder(action))
    return res
  } catch (err) {
    console.error(err)
  }
}

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_FOR_GUEST_EMAIL:
      return { ...state, guestEmail: action.email }
    case CREATED_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}