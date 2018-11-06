import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => {
      return { editing: !prevState.editing }
    })
  }

  render() {
    const { firstName, lastName, email } = this.props
    return (
      <div>
        <h3>Welcome, {firstName || email}</h3>
        <p>details about editing user below</p>
        {!this.state.editing ? (
          <button onClick={this.handleClick} />
        ) : (
            <p>EDITING FORM GOES HERE</p>
          )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
