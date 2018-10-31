import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// import thunks etc 

// NOT CURRENTLY USABLE; DO NOT RENDER YET
class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.product) { // mapStateToProps will be product: state.whateverSubReducer.currentProduct
      // ^^ Will this ever not run? Should it be in componentDidUpdate?
      const { id } = this.props.match.params
      // this.props.fetchProduct(id)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault
    this.props.addToCart(this.props.product.id, this.state.amount)
  }

  render() {
    const { product } = this.props
    return (
      <div>
        {product && (
          <Fragment> {/*Cool thing that obviates the need for wrapper divs!*/}
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <form id='add-to-cart-form' onSubmit={this.handleSubmit}>
              <input type='number' value={this.state.amount} name='amount' required onChange={this.handleChange} />
              <input type='submit' value='Add To Cart' />
            </form>
          </Fragment>
        )}
      </div>
    )
  }
}


// *****JUST A SUGGESTION:

// const mapStateToProps = (state) => {
//   return {
//     product: state.productReducer.currentProduct
//   }
// }

// const mapDipatchToProps = (dispatch) => {
//   return {
//     fetchProduct: (productId) => dispatch(fetchOneProduct(productId)),
//       //^the above will be a thunk with an axios request to /api/products/<productId>
//     addToCart: (productId, amount) dispatch(addToCart(productId, amount))
//     // put functionality for admin product editing
//     // I'm so sick of writing "product"
//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))

// FURTHER IDEAS:
// -Add possible options for the current product? Like, I don't know, red or blue Creamy Special Gravy?