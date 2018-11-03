import React from 'react'
import { Link } from 'react-router-dom'

export default class ProductDetails extends React.Component {

  componentDidMount() {

  }


  render() {
    return (
      <div className='productDetails' key={props.product.id}>
        <h1>Thank you for your order!</h1>
        <p>Maybe have summary of order here?</p>
        {/* this should display the latest order for the current user. How can we pull this order ID? */}
      </div>
    )
  }

}
