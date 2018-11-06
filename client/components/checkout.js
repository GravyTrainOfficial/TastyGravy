import React, { Component } from 'react'
import { getAllItems, removeLineItem, modifyLineItem } from '../store/cart'
import { ItemPreview } from './index'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const checkout = () => console.log('Hey checked out!')

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.updateItem = this.updateItem.bind(this)
  }

  componentDidMount() {
    this.props.getAllItems()
  }

  updateItem(difference, item) {
    this.props.modifyLineItem({ ...item, quantity: difference })
  }

  render() {
    return (
      <div>
        <h1>CHECK OUT</h1>
        {this.props.cart && 
          this.props.cart.map(item => 
            <ItemPreview 
            key={item.productId} 
            item={item} 
            onClick={this.props.removeLineItem}
            quantity={item.quantity}
            changeQuantity={this.updateItem}
             />)}
        <button type="button" onClick={() => checkout()}>CHECKOUT</button>
        <h1>STRIPE STUFF HERE?</h1>
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

export default withRouter(connect(mapState, mapDispatch)(Checkout))