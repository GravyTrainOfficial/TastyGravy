import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchSingleProduct } from '../store/products'
import {addLineItem, modifyLineItem, getAllItems} from '../store/cart'

// import thunks etc

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // mapStateToProps will be product: state.whateverSubReducer.currentProduct
    // ^^ Will this ever not run? Should it be in componentDidUpdate?
    const productId = Number(this.props.match.params.productId)
    // Will need withRouter for this, as below in my suggestion
    this.props.getAllItems()
    this.props.fetchSingleProduct(productId)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    const obj = {
      product: this.props.product,
      productId: this.props.product.id,
      quantity: Number(this.state.quantity)
    }

    this.props.getAllItems()
    const {cart} = this.props
    if (cart.find(item => item.productId === obj.productId)) {
      this.props.addLineItem(obj, cart)
    } else {
      this.props.modifyLineItem(obj, cart)
    }
    this.props.getAllItems()
  }

  render() {
    const product = this.props.product
    if (product) {
      return (
        <div>
          <img src={product.image_URL} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <form id="add-to-cart-form" onSubmit={this.handleSubmit}>
            <input
              type="number"
              min='1'
              max={this.props.product.inventoryQuantity /*change to reflect subtraction of quantity that's already in cart*/}
              value={this.state.quantity}
              name="quantity"
              required
              onChange={this.handleChange}
            />
            <input type="submit" value='Add to Cart' />
          </form>
        </div>
      )
    } else {
      return ' '
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.productReducer.singleProduct,
    cart: state.cartReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllItems: () => dispatch(getAllItems()),
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addLineItem: (productObj, cart) => dispatch(addLineItem(productObj, cart)),
    modifyLineItem: (productObj, cart) => dispatch(modifyLineItem(productObj, cart))
  }
}

const connectedSingleProduct = withRouter(connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
))

export default connectedSingleProduct

// FURTHER IDEAS:
// -Add possible options for the current product? Like, I don't know, red or blue Creamy Special Gravy?
