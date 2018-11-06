import React from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../util'
import { modifyLineItem } from '../store/cart';
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
    const newQuantity = this.props.item.quantity + difference
    if (newQuantity < 0) {
      alert('Quantity cannot be less than 0')
    } else if (newQuantity === 0) {
      const confirmDelete = confirm("Remove item from cart?")
      if (confirmDelete) {
        this.props.removeLineItem(this.props.item.productId)
      }
    } else if (newQuantity > this.props.item.product.inventoryQuantity) {
      alert('Not enough in stock')
    } else {
      this.setState({
        quantity: newQuantity
      })
      this.props.changeQuantity(difference)
    }
  }

  render() {
    const { item } = this.props

    return (
      <div id='item-preview-container'> {/*will be a flexbox!*/}
        <div>
          <Link to={`/products/${item.productId}`} ><h1>{item.product.name}</h1></Link>
          <img src={item.product.image_URL} />
        </div>
        <div>
          <p>Price: {formatPrice(item.product.price)}</p>
          <p>In Stock: {item.product.inventoryQuantity}</p>
          <div id='increment-decrement-container'>
            <input type='number' value={this.state.quantity} min='0' name='quantity' onChange={(event) => this.handleChange(event.target.value - item.quantity)} />
            <div>
              <h2 onClick={() => this.handleChange(1)}>+</h2>
              <h2 onClick={() => this.handleChange(-1)}>-</h2>
            </div>
            <button onClick={this.props.removeLineItem}>Remove From Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeQuantity: (difference) => dispatch(modifyLineItem({ ...this.props.item, quantity: difference })),
    removeLineItem: () => dispatch(removeLineItem(this.props.item.productId))
  }
}

export default connect(null, mapDispatch)(ItemPreview)

