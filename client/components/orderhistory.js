import React, {Component} from 'react'
import axios from 'axios'

export default class OrderHistory extends Component {
  const
  constructor(props) {
    super(props)
    this.state = []
  }

  async componentDidMount() {
    const orders = await axios.get('/api/users/orders/me')
    this.setState(orders)
  }

  render() {
    if (!campus) {
      return (
        <div>
          <h1>ORDER HISTORY</h1>
          <p>There is currently no order history</p>
        </div>
      )
    } else {
      return (
        <div>
          <h1>ORDER HISTORY</h1>
          <p>ORDER HISTORY HERE</p>
        </div>
      )
    }
  }
}
