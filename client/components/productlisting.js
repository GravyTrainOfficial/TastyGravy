import React, { Component } from 'react'
import ProductDetails from './productdetails'
import { fetchProductData } from '../store/products'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProductListing extends Component {

  async componentDidMount() {
    await this.props.fetchProductData()
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>{this.props.products && this.props.products.map(product => <ProductDetails product={product} key={product.id} />)}</tr>
          </tbody>
        </table>
      </div >
    )
  }
}

const mapState = state => {
  return {
    products: state.productReducer.products
  }
}

const mapDispatch = { fetchProductData }


export default withRouter(connect(mapState, mapDispatch)(ProductListing))

/**
 * PROP TYPES
 */
// ProductListing.propTypes = {
// }
