import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="authForm">
      <form className="ui form" onSubmit={handleSubmit} name={name}>
        <div className="field">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div className="field">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div className="field">
          <button className="ui button" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a className="googleName" href="/auth/google">
        {displayName} with Google
      </a>
    </div>
  )
}

//semanticUIREACT form component:
{
  /* <div class= "formFlex">
<Form onSubmit={handleSubmit} name={name}>
  <Form.Field>
    <label htmlFor="email">Email</label>
    <input name="email" type="text" placeholder="Enter Email Here" />
  </Form.Field>
  <Form.Field>
    <label htmlFor="password">Password</label>
    <input
      name="password"
      type="text"
      placeholder="Enter Password here"
    />
  </Form.Field>
  <Button type="submit">{displayName}</Button>
  {error && error.response && <div> {error.response.data} </div>}
</Form>

<a className="googleLink" href="/auth/google">
  {displayName} with Google
</a> */
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
