import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllItems } from '../store/cart'
import { ItemPreview } from './index'
import { formatPrice, calculateCartTotal } from '../util'


const checkout = () => console.log('Hey checked out!')

class Cart extends Component {
componentDidMount() {
    this.props.getAllItems()
  }

  // updateItem(difference, item) {
  //   this.props.modifyLineItem({ ...item, quantity: difference })
  // }

  render() {
    return (
      <div>
        <h1>My Cart</h1>
        {this.props.cart && this.props.cart.map(
          item => <ItemPreview key={item.productId} item={item} />
          )}
        <h3>CART TOTAL: {formatPrice(calculateCartTotal(this.props.cart))}</h3>
        <button type="button" onClick={() => checkout()}>CHECKOUT</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cartReducer
  }
}

const mapDispatch = { getAllItems }

export default withRouter(connect(mapState, mapDispatch)(Cart))