import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'

/**
 * COMPONENT
 */
class addProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      category: '',
      price: '',
      inventory: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('add button pressed')

  }

  render() {
    return (
      <div>
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
              <small>Category</small>
            </label>
            <select value={this.state.category} name="category">
              <option value="lumpy">Lumpy</option>
              <option value="smooth">Smooth</option>
              <option value="fatty">Fatty</option>
              <option value="lite">Lite</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input name="price" type="number" value={this.state.price} />
          </div>
          <div>
            <label htmlFor="inventory">
              <small>Inventory Available</small>
            </label>
            <input name="inventory" type="number" value={this.state.inventory} />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div >
    )
  }
}

export default addProduct

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapState = state => {
//   return {

//   }
// }


// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }

// export default (mapState, mapDispatch)(addProduct)

