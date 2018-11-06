import axios from 'axios'

const CHECK_FOR_GUEST_EMAIL = 'CHECK_FOR_GUEST_EMAIL'
const DISPLAY_RESULT = 'DISPLAY_RESULT'

const initialState = {
  guestEmail: '',
  order: null,
  status: 'pending'
}

const checkForGuestEmail = email => ({ type: CHECK_FOR_GUEST_EMAIL, email })
const displayResult = (order, status) => ({ type: DISPLAY_RESULT, order, status })

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
  console.log(`enterStripe****`)
  try {
    const res = await axios.post('api/charge', data)
    console.log(`this is res`, res)
    const order = res.data.possibleNewOrder
    console.log(`order in enterStripw: `, order)
    const status = res.status === 200 ? 'success' : 'failure'
    dispatch(displayResult(order, status))
    // this.setState({ complete: true });
    console.log("Purchase Complete!")
  } catch (err) {
    console.error(err)
  }
}

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_FOR_GUEST_EMAIL:
      return { ...state, guestEmail: action.email }
    case DISPLAY_RESULT:
      return { ...state, order: action.order, status: action.status }
    default:
      return state
  }
}