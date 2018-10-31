import React from 'react'
import ProductDetails from './productdetails'

function ProductListing(props) {

  //Temporary
  props = {
    products: [{
      id: 1, firstName: 'Maria',
      lastName: 'Johnson',
      email: 'maryj@test.com',
      isAdmin: false
    }, {
      id: 2, firstName: 'Pegmann',
      lastName: 'College',
      email: 'whyisthisacollege@what.com',
      isAdmin: false
    }, {
      id: 3, firstName: 'Larry',
      lastName: 'Larryson',
      email: 'basicbro@geemail.com',
      isAdmin: false
    }]
  }

  return (
    < div >
      <ul>{props.products.map(product => <li key={product.id}><ProductDetails product={product} /></li>)}</ul>
    </div >
  )
}

//Temporary
export default ProductListing

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     products: state.products
//   }
// }

// const mapDispatch = { dispatch products thunk name }
// }


// export default withRouter(connect(mapState, mapDispatch)(ProductListing))

/**
 * PROP TYPES
 */
// ProductListing.propTypes = {
// }
