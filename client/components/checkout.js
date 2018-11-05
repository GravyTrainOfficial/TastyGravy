import React, { Component } from 'react'
import { getAllItems, removeLineItem } from '../store/cart'
import { ItemPreview } from './index'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CheckoutForm from './checkout-form'
import { Elements, StripeProvider } from 'react-stripe-elements';


const checkout = () => console.log('Hey checked out!')

class Checkout extends Component {

  async componentDidMount() {
    await this.props.getAllItems()
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

        <h1>STRIPE STUFF HERE?</h1>
        <StripeProvider apiKey="pk_test_qDNHLYG3F1rF307ZNsEV1Bw6">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>

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

export default withRouter(connect(mapState, mapDispatch)(Checkout))