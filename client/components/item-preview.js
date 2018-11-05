import React from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux';
// withRouter

// import { removeLineItem } from '../store/cart'

//Used for cart items and product listing items, maybe?

class ItemPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.quantity
    })
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleKeyPress(event) {
    if(false /*replace with if the key is enter*/) {
      const difference = this.state.quantity - this.props.quantity
      this.props.changeQuantity(difference)
    }
  }

  render() {
    return (
      <div id='item-preview-container'> {/*will be a flexbox!*/}
        <div key={props.item.productId}>
          <Link to={`/products/${props.item.productId}`} ><h1>{props.item.product.name}</h1></Link>
          <img src={props.item.product.image_URL} />
        </div>
        <div>
          <h3>{props.item.name}</h3>
          <p>Price: {props.item.product.price}</p> {/*to be in price format; 
          make a folder for utility functions for this kind of thing?*/}
          <p>Inventory: {props.item.inventoryQuantity}</p>
          <div id='increment-decrement-container'>
            <input type='number' value={this.state.quantity} name='quantity' onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <div>
              <div onClick={() => this.props.changeQuantity(1)}>+</div> <br />
              <div onClick={() => this.props.changeQuantity(-1)}>-</div>
            </div>
          <h3 onClick={this.props.handleClick}>{this.props.buttonText}</h3>
        </div>
          <button type="button" onClick={() => props.removeLineItem(props.item.productId)}>Delete Item</button>
        </div>
      </div>
    )
  }
}

// THINGS NEEDED TO BE PUT IN AS PROPS:
// item: duh
// quantity: either a held state amount (initialized at 1) if it's a product listing or cart quantity if it's in the cart
// buttonText: what kind of button it is (delete vs add to cart, etc)
// handleClick: whatever is supposed to happen with the button
// changeQuantity: either going up and changing the held state amount or dispatching a modifyLineItem

// const mapDispatch = { removeLineItem }

// export default withRouter(connect(null, mapDispatch)(ItemPreview))

