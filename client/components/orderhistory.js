import React, {Component} from 'react'
import axios from 'axios'

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
    console.log(this.state.orders)
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
                  <li>Item: {lineItem.product.name}</li>
                  <li>
                    <img src={lineItem.product.image_URL} />
                  </li>
                  <li>Status {lineItem.status}</li>
                  <li>Amount: {lineItem.quantity}</li>
                  <li>
                    Cost: {lineItem.product.price} * {lineItem.quantity}
                  </li>
                </ul>
              ))}
            </h2>
          ))}
        </div>
      )
    }
  }
}
