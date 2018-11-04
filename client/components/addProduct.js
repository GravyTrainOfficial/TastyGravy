import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'
import { fetchProductData, addProduct } from '../store/products'


/**
 * COMPONENT
 */
class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      category: '',
      price: '',
      inventoryQuantity: '',
      image_URL: '',
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProductData()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ errorMessage: '' })
    if (this.isCategoryReady() && this.isUniqueProduct()) {
      this.props.addProduct(this.state)
    } else {
      console.log('enter else')
      if (!this.isCategoryReady()) {
        this.setState({ errorMessage: this.state.errorMessage + 'Enter a category' })
      }
      if (!this.isUniqueProduct()) {
        this.setState({ errorMessage: this.state.errorMessage + 'This product already exists' })
      }
      console.log(this.state)
    }

  }



  isCategoryReady() {
    return (this.state.category !== '' && this.state.category !== 'All')
  }

  isUniqueProduct() {
    // if the name in state is included in products currently, return false
    let products = this.props.products
    for (let i = 0; i < products.length; i++) {
      if (this.state.name.toLowerCase() === products[i].name.toLowerCase()) {
        return false
      }
    }
    return true
  }


  render() {
    return (
      <div className='addForm'>
        <h1>Add Form</h1>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit} >
          <div>
            <label htmlFor="name">
              <small>Product Name</small>
            </label>
            <input name="name" type="text" value={this.state.name} />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <textarea name="description" value={this.state.description} />
          </div>
          <div>
            <label htmlFor="category">
              {/* want to pull a selection dropdown and pull from categories available from the DB, but also want to be able to create new category */}
              <small>Category (can't be All)</small>
            </label>
            <select name="category" value={this.state.category}>
              {this.props.categories && this.props.categories.map(category =>
                <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input name="price" type="number" value={this.state.price} />
          </div>
          <div>
            <label htmlFor="inventoryQuantity">
              <small>Inventory Available</small>
            </label>
            <input name="inventoryQuantity" type="number" value={this.state.inventoryQuantity} />
          </div>
          <div>
            <label htmlFor="image_URL">
              <small>Image URL</small>
            </label>
            <input name="image_URL" type="url" value={this.state.image_URL} />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h1>{this.state.errorMessage}</h1>
      </div >
    )
  }
}

const mapState = state => {
  return {
    categories: state.productReducer.categories,
    products: state.productReducer.products
  }
}

const mapDispatch = { fetchProductData, addProduct }


export default connect(mapState, mapDispatch)(AddProduct)

