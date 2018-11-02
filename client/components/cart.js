import React, { Component } from 'react'
import { getAllItems, removeLineItem, } from '../store/cart'
import { ItemPreview } from './index'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Cart extends Component {

  async componentDidMount() {
    await this.props.getAllItems()
  }

  render() {
    return (
      <div>
        <h1>My Cart</h1>
        {this.props.cart && this.props.cart.map(item => <ItemPreview key={item.id} item={item} />)}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cartReducer
  }
}

const mapDispatch = { getAllItems, removeLineItem }

export default withRouter(connect(mapState, mapDispatch)(Cart))