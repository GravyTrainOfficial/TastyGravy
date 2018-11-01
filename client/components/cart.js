// import React from 'react'
// import { ItemPreview } from './index'

const dummyItems = [
  {
    name: 'bad gravy',
    description: 'go away',
    price: 0.5,
    quantity: 10,
    image_URL: 'https://cdn.shopify.com/s/files/1/2382/0223/products/30873-1_73d9e0c4-6737-4d59-a425-35536ad6c131_200x200.jpg?v=1526529402'
  },
  {
    name: 'i hate gravy',
    description: 'i hate products',
    price: 99.99,
    quantity: 99,
    image_URL: 'https://cdn.shopify.com/s/files/1/2382/0223/products/30873-1_73d9e0c4-6737-4d59-a425-35536ad6c131_200x200.jpg?v=1526529402'
  }
]

// const Cart = (props) => {
//   // props.products = dummyItems // delete when not using dummy data, obviously
//   return (
//     <div>
//       <h1>My Cart</h1>
//       {dummyItems.map(item => <ItemPreview key={item.name} item={item} />)}
//     </div>
//   )
// }

// export default Cart

//to edit

import React, { Component } from 'react'
import { getAllItems, removeLineItem, } from '../store/cart'
import { ItemPreview } from './index'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Cart extends Component {
  constructor(props) {
    super(props)

  }
  async componentDidMount() {
    await this.props.getAllItems()
  }


  render() {
    console.log(this.props)
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
    cart: state.cartReducer.cart
  }
}

const mapDispatch = { getAllItems, removeLineItem }

export default withRouter(connect(mapState, mapDispatch)(Cart))
