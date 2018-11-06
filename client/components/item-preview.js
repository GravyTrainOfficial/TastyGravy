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
    const difference = this.state.quantity - this.props.quantity
    this.setState({
      quantity: event.target.value
    })
    this.props.changeQuantity(difference, this.props.item)
  }

  handleIncrement(amount) {
    const newQuantity = this.props.item.quantity + amount
    if (newQuantity >= 0 && newQuantity <= this.props.item.product.inventoryQuantity) {
      this.props.changeQuantity(amount, this.props.item)
    }
  }

  render() {
    const { item, changeQuantity } = this.props

    return (
      <div id='item-preview-container'> {/*will be a flexbox!*/}
        <div key={item.productId}>
          <Link to={`/products/${item.productId}`} ><h1>{item.product.name}</h1></Link>
          <img src={item.product.image_URL} />
        </div>
        <div>
          {/*<h3>{item.product.name}</h3>*/}
          <p>Price: {item.product.price}</p> {/*to be in price format; 
          make a folder for utility functions for this kind of thing?*/}
          <p>Inventory: {item.product.inventoryQuantity}</p>
          <div id='increment-decrement-container'>
            <input type='number' value={this.state.quantity} min='0' max={item.product.inventoryQuantity} name='quantity' onChange={this.handleChange} />
            <div>
              <div onClick={() => changeQuantity(1, item)}>+</div> <br />
              <div onClick={() => changeQuantity(-1, item)}>-</div>
            </div>
          <h3 onClick={this.props.handleClick}>Remove From Cart</h3>
        </div>
          {/*<button type="button" onClick={() => props.removeLineItem(props.item.productId)}>Delete Item</button>*/}
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

