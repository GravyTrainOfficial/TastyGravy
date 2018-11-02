import React, { Component } from 'react'
import ProductDetails from './productdetails'
import { fetchProductData, fetchFilteredProducts } from '../store/products'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '--'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({ value: event.target.value })
    await this.props.fetchFilteredProducts(event.target.value)
  }

  async componentDidMount() {
    await this.props.fetchProductData()
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange} value={this.state.value}>
          {this.props.categories && this.props.categories.map(category =>
            <option key={category} value={category}>{category}</option>)}
        </select>
        <div className='productsList'>
          {this.props.products && this.props.products.map(product => <ProductDetails product={product} key={product.id} />)}
        </div>
      </div >
    )
  }
}

const mapState = state => {
  return {
    products: state.productReducer.products,
    categories: state.productReducer.categories
  }
}

const mapDispatch = { fetchProductData, fetchFilteredProducts }


export default withRouter(connect(mapState, mapDispatch)(ProductListing))

/**
 * PROP TYPES
 */
// ProductListing.propTypes = {
// }
