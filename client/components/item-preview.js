import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, calculateProductTotal } from '../util'
import { connect } from 'react-redux';
// withRouter

import { modifyLineItem, removeLineItem } from '../store/cart'

//Used for cart items and product listing items, maybe?

class ItemPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity
    })
    this.handleChange = this.handleChange.bind(this)
    // this.handleIncrement = this.handleIncrement.bind(this)
  }

  handleChange(difference) {
    const { item, changeQuantity, removeLineItem } = this.props
    const newQuantity = item.quantity + difference
    if (newQuantity < 0) {
      alert('Quantity cannot be less than 0')
    } else if (newQuantity === 0) {
      if (confirm("Remove item from cart?")) {
        removeLineItem(item.productId)
      }
    } else if (newQuantity > item.product.inventoryQuantity) {
      alert('Not enough in stock')
    } else {
      this.setState({
        quantity: newQuantity
      })
      changeQuantity(item, difference)
    }
  }

  render() {
    const { item, removeLineItem } = this.props

    return (
      <div id='item-preview-container'> {/*will be a flexbox!*/}
        <img className='small-image' src={item.product.image_URL} />
        <div className='item-preview-title'>
          <Link to={`/products/${item.productId}`} ><h1>{item.product.name}</h1></Link>
        </div>
        <div id='stock-price-container'>
          <p>In Stock: {item.product.inventoryQuantity}</p>
          <p>Unit Price: {formatPrice(item.product.price)}</p>
          <p>Total: {formatPrice(calculateProductTotal(item))}</p>
        </div>
            <input type='number' value={this.state.quantity} min='0' name='quantity' onChange={(event) => this.handleChange(event.target.value - item.quantity)} />
        <div id='increment-decrement-container'>
          <div>
            <h2 onClick={() => this.handleChange(1)}>+</h2>
            <h2 onClick={() => this.handleChange(-1)}>-</h2>
          </div>
        </div>
            <button onClick={() => removeLineItem(item.productId)}>Remove From Cart</button>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeQuantity: (item, difference) => dispatch(modifyLineItem({ ...item, quantity: difference })),
    removeLineItem: (productId) => dispatch(removeLineItem(productId))
  }
}

export default connect(null, mapDispatch)(ItemPreview)

