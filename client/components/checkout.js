import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { ItemPreview, CheckoutForm, GetGuestEmail } from './index'
import { getAllItems } from '../store/cart'
import { fetchGuestEmail, setGuestEmail, enterStripe } from '../store/checkout'
import { formatPrice, calculateCartTotal } from '../util'

class Checkout extends Component {
  constructor(props) {
    super(props)
    // this.updateItem = this.updateItem.bind(this)
    this.displayError = this.displayError.bind(this)
    this.state = {
      error: false
    }
  }

  displayError() {
    this.setState({ error: true })
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
        <h1>Confirm Purchase</h1>
        {this.props.cart &&
          this.props.cart.map(item => (
            <ItemPreview key={item.productId} item={item} />
          ))}
        <h3>CART TOTAL: {formatPrice(calculateCartTotal(this.props.cart))}</h3>
        {this.props.guestEmail || this.props.isLoggedIn ? (
          <StripeProvider apiKey="pk_test_qDNHLYG3F1rF307ZNsEV1Bw6">
            <Elements>
              <CheckoutForm
                displayError={this.displayError}
                total={calculateCartTotal(this.props.cart)}
                enterStripe={this.props.enterStripe}
              />
            </Elements>
          </StripeProvider>
        ) : (
            <GetGuestEmail setGuestEmail={this.props.setGuestEmail} />
          )}
        {this.props.status === 'failure' && 'error running the card'}
        {this.props.status === 'success' && 'Order Complete'}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cartReducer,
    guestEmail: state.checkoutReducer.guestEmail,
    status: state.checkoutReducer.status,
    order: state.checkoutReducer.order,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = { getAllItems, fetchGuestEmail, setGuestEmail, enterStripe }

export default withRouter(connect(mapState, mapDispatch)(Checkout))
