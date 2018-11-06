import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getAllItems, removeLineItem } from '../store/cart'
import { fetchGuestEmail, setGuestEmail } from '../store/checkout'
import { ItemPreview, GetGuestEmail } from './index'

import CheckoutForm from './checkout-form'
import { Elements, StripeProvider } from 'react-stripe-elements';

class Checkout extends Component {

  componentDidMount() {
    this.props.getAllItems()
    this.props.fetchGuestEmail()
  }

  render() {
    return (
      <div>
        <h1>Checkout Confirm - BETTER TITLE SOON</h1>
        {this.props.cart &&
          this.props.cart.map(item =>
            <ItemPreview
              key={item.id}
              item={item}
              removeLineItem={this.props.removeLineItem} />)}
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

const mapDispatch = { getAllItems, removeLineItem, fetchGuestEmail, setGuestEmail }

export default withRouter(connect(mapState, mapDispatch)(Checkout))