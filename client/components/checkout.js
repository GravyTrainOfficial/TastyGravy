import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { ItemPreview, CheckoutForm, GetGuestEmail } from './index'
import { getAllItems } from '../store/cart'
import { fetchGuestEmail, setGuestEmail } from '../store/checkout'

class Checkout extends Component {
  constructor(props) {
    super(props)
    // this.updateItem = this.updateItem.bind(this)
  }

  componentDidMount() {
    this.props.getAllItems()
    this.props.fetchGuestEmail()
  }

  // updateItem(difference, item) {
  //   this.props.modifyLineItem({ ...item, quantity: difference })
  // }

  render() {
    return (
      <div>
        <h1>Checkout Confirm - BETTER TITLE SOON</h1>
        {this.props.cart && 
          this.props.cart.map(item => <ItemPreview key={item.productId} item={item} />)}
        <button type="button" onClick={() => checkout()}>CHECKOUT</button>
        {this.props.guestEmail ?
          <StripeProvider apiKey="pk_test_qDNHLYG3F1rF307ZNsEV1Bw6">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider> :
          <GetGuestEmail setGuestEmail={this.props.setGuestEmail} />}
      </div>


    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cartReducer,
    guestEmail: state.checkoutReducer.guestEmail
  }
}

const mapDispatch = { getAllItems, fetchGuestEmail, setGuestEmail }

export default withRouter(connect(mapState, mapDispatch)(Checkout))