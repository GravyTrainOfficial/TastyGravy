import React, { Component } from 'react'
import { getAllItems, removeLineItem, checkoutCart } from '../store/cart'
import { ItemPreview } from './index'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Cart extends Component {

  async componentDidMount() {
    await this.props.getAllItems()
  }

  checkout = () => {
    console.log('Hey checked out!')
    this.props.checkoutCart()
    // take the current user cart and make an order with it
    // need a thunk to get current cart, (there is already a route for this) change all those orders to be status 'purchased' and add order ID to all line
    // find all line items that are status cart with the current ID
    // set those line items to have a single order item
    // redirect the user to the order confirmation page
  }


  render() {
    return (
      <div>
        <h1>My Cart</h1>
        {this.props.cart && this.props.cart.map(item => <ItemPreview key={item.id} item={item} removeLineItem={this.props.removeLineItem} />)}
        <button type="button" onClick={() => this.checkout()}>CHECKOUT</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cartReducer
  }
}

const mapDispatch = { getAllItems, removeLineItem, checkoutCart }

export default withRouter(connect(mapState, mapDispatch)(Cart))