import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = props => {
  const {handleClick, isLoggedIn, role} = props
  return (
    <div>
      <h1 className="title">TASTY GRAVY</h1>
      <nav>
        {isLoggedIn ? (
          <div className="ui five item menu">
            {/* The navbar will show these links after you log in */}
            <Link className="item" to="/home">
              Home
            </Link>
            <Link className="item" to="/products">
              Products
            </Link>
            <Link className="item" to="/cart">
              My Cart
            </Link>
            <Link className="item" to="/orderhistory">
              Order History
            </Link>
            {role === 'admin' && <Link to="/addProduct">Add Products</Link>}
            <a className="item" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="ui four item menu">
            {/* The navbar will show these links before you log in */}
            <Link className="item" to="/login">
              Login
            </Link>
            <Link className="item" to="/signup">
              Sign Up
            </Link>
            <Link className="item" to="/products">
              Products
            </Link>
            <Link className="item" to="/cart">
              My Cart
            </Link>
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
