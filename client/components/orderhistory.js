import React, { Component } from 'react'
import axios from 'axios'

export default class OrderHistory extends Component {
  const
  constructor(props) {
    super(props)
    this.state = { orders: [] }
  }

  async componentDidMount() {
    const orderData = await axios.get('/api/users/orders/me')
    const orderHistory = orderData.data
    this.setState({ orders: orderHistory })
  }

  render() {
    if (!this.state.orders.length) {
      return (
        <div>
          <h1>ORDER HISTORY</h1>
          <p>There is currently no order history</p>
        </div>
      )
    } else {
      return (
        <div>
          <h1>ORDER HISTORY:</h1>

          {this.state.orders.map(order => (
            <h2 key={order.id}>
              Order Number {order.id}:
              <br />
              {order.lineitems.map(lineItem => (
                <ul key={lineItem.id}>
                  <li>{lineItem.product.name}</li>
                </ul>
              ))}
            </h2>
          ))}
        </div>
      )
    }
  }
}
