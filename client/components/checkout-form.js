import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });

    console.log('this is token ', token)
    const body = {
      token: {
        id: token.id
      },
      amount: this.props.total,

    }
    console.log('this.props.total: ', this.props.total)
    // let response = await axios.post('api/charge', body)
    let response = this.props.enterStripe(body)


    // console.log('this is response', response)
    // if (response.status === 200) {
    //   this.setState({ complete: true });
    //   console.log("Purchase Complete!")
    // } else {
    //   this.props.displayError()
    // }

  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>

        <CardElement id='card-form' />
        <button type='submit' onClick={this.submit}>Send</button>
      </div>
    );
  }
}




export default injectStripe(CheckoutForm);