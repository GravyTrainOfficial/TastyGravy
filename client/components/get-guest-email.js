import React, {Component} from 'react'

export default class GetGuestEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  handleChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.setGuestEmail(this.state.email)
  }

  render() {
    return (
      <div id='guest-email-form'>
        <h3>Please enter your email to continue checking out:</h3>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.email} name='email' onChange={this.handleChange} />
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

