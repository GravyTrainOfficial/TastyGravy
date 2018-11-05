import React, { Component } from 'react'

//NOTES FOR IMPLEMENTATION AT BOTTOM

export default class IncrementDecrementForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    this.setState({ quantity: this.props.quantity })
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleKeyPress(event) {
    if(event /*the key is enter*/) {
      const difference = this.state.quantity - this.props.quantity
      this.props.changeQuantity(difference)
    }
  }

  render() {
    return(
      <div id='increment-decrement-container'>
        <input type='number' value={this.state.quantity} name='quantity' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <div>
          <div onClick={() => this.props.changeQuantity(1)}>+</div> <br />
          <div onClick={() => this.props.changeQuantity(-1)}>-</div>
        </div>
        <h3 onClick={this.props.delete}>x</h3>
      </div>
    )
  }
}

// IMPLEMENTATION

// To be passed down from cart-item (container component):
// changeQuantity: calls modifyLineItem with the whatever quantity passed in
// delete: deletes... (may need to be passed down from whole cart in order to dynamically change)
//    -could also be a mapDispatch somewhere?