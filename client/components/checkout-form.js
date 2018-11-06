import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    // let response = await fetch("api/charge", {
    //   method: "POST",
    //   headers: { "Content-Type": "text/plain" },
    //   body: {
    //     token: {
    //       id: token.id
    //     },
    //     amount: this.props.total,

    //   }
    // });
    const body = {
      token: {
        id: token.id
      },
      amount: this.props.total,

    }
    console.log('this.props.total: ', this.props.total)
    let response = await axios.post('api/charge', body)


    console.log('', response)
    if (response.ok) this.setState({ complete: true });
    console.log("Purchase Complete!")

    // const data = await axios.post("/api/charge", token.id)
    // console.log('', data)
    // if (data.ok) console.log("Purchase Complete!")

  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>

        <CardElement />
        <button type='submit' onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);