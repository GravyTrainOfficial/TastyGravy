import React, { Component } from 'react'
import { getAllItems, removeLineItem, modifyLineItem } from '../store/cart'
import { ItemPreview } from './index'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const checkout = () => console.log('Hey checked out!')

class Cart extends Component {

  async componentDidMount() {
    await this.props.getAllItems()
  }

  updateItem(difference, item) {
    this.props.modifyLineItem({ ...item, quantity: difference })
  }

  render() {
    return (
      <div>
        <h1>My Cart</h1>
        {this.props.cart && this.props.cart.map(
          item => <ItemPreview key={item.productId} item={item} quantity={item.quantity} buttonText='Remove From Cart' handleClick={this.props.removeLineItem} changeQuantity={this.updateItem}/>
          )}
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

const mapDispatch = { getAllItems, removeLineItem, modifyLineItem }

export default withRouter(connect(mapState, mapDispatch)(Cart))