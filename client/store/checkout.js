import axios from 'axios'

const CHECK_FOR_GUEST_EMAIL = 'CHECK_FOR_GUEST_EMAIL'

const initialState = {}

const checkForGuestEmail = email => ({ type: CHECK_FOR_GUEST_EMAIL, email })

export const fetchGuestEmail = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/guest-email')
    const action = res.data
    dispatch(checkForGuestEmail(action))
  } catch (err) {
    console.error(err)
  }
}

export const setGuestEmail = (email) => async dispatch => {
  try {
    const res = await axios.post('/api/users/guest-email', email)
    const action = res.data
    dispatch(checkForGuestEmail(action))
  } catch (err) {
    console.error(err)
  }
}

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_FOR_GUEST_EMAIL:
      return action.email
    default:
      return state
  }
}