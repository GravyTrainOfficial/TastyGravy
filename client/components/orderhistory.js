import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {calculateProductTotal, calculateCartTotal, formatPrice} from '../util'

export default class OrderHistory extends Component {
  const
  constructor(props) {
    super(props)
    this.state = {orders: []}
  }

  async componentDidMount() {
    const orderData = await axios.get('/api/users/orders/me')
    const orderHistory = orderData.data
    this.setState({orders: orderHistory})
  }

  render() {
    console.log(calculateProductTotal)
    if (!this.state.orders.length) {
      // refactory to ternary or short circuit
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
            <div key={order.id}>
              <h2>Order Number {order.id}:</h2>
              <br />
              {order.lineitems.map(lineItem => (
                <ul key={lineItem.id}>
                  <li>Item: {lineItem.product.name}</li>
                  <li>
                    <img
                      className="productImage"
                      src={lineItem.product.image_URL}
                    />
                  </li>
                  <li>Status: {lineItem.status}</li>
                  <li>Amount: {lineItem.quantity}</li>
                  <li>Cost: {formatPrice(calculateProductTotal(lineItem))}</li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      )
    }
  }
}
