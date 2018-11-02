import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchSingleProduct } from '../store/products'
import { addLineItem } from '../store/cart'

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
    const productId = this.props.match.params.productId
    // Will need withRouter for this, as below in my suggestion
    this.props.fetchSingleProduct(productId)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    const obj = {
      productId: this.props.match.params.productId,
      quantity: this.state.quantity,
      price: this.props.product.price
    }
    this.props.addLineItem(obj)
  }

  render() {
    const product = this.props.product
    if (this.props.product) {
      return (
        <div>
          <Fragment>
            {/*Cool thing that obviates the need for wrapper divs!*/}
            <img src={product.image_URL} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <form id="add-to-cart-form" onSubmit={this.handleSubmit}>
              <input
                type="number"
                value={this.state.quantity}
                name="quantity"
                required
                onChange={this.handleChange}
              />
              <input type="submit" value='Add to Cart' />
            </form>
          </Fragment>
        </div>
      )
    } else {
      return ' '
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.productReducer.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addLineItem: productObj => dispatch(addLineItem(productObj))

    //^the above will be a thunk with an axios request to /api/products/<productId>
    // put functionality for admin product editing
    // I'm so sick of writing "product"
  }
}

const connectedSingleProduct = withRouter(connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
))

export default connectedSingleProduct

// FURTHER IDEAS:
// -Add possible options for the current product? Like, I don't know, red or blue Creamy Special Gravy?
