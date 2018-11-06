import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllItems, removeLineItem, modifyLineItem } from '../store/cart'
import { ItemPreview } from './index'


const checkout = () => console.log('Hey checked out!')

class Cart extends Component {
  constructor(props) {
    super(props)
    // this.updateItem = this.updateItem.bind(this)
  }

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