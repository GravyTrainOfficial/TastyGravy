import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = props => {
  const { handleClick, isLoggedIn, role } = props
  console.log(props)
  return (
    <div>
      <h1>TASTY GRAVY TEST</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {console.log(props)}
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/orderhistory">Order History</Link>
            {role === 'admin' && <Link to="/addProduct">Add Products</Link>}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">My Cart</Link>
              {/* <Link to="/orderhistory">Order History</Link> */}
            </div>
          )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
