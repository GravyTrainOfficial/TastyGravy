import React from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux';
// withRouter

// import { removeLineItem } from '../store/cart'

//Used for cart items and product listing items, maybe?

const ItemPreview = (props) => {
  return (
    <div id='item-preview-container'> {/*will be a flexbox!*/}
      <div key={props.item.id}>
        <Link to={`/products/${props.item.product.id}`} ><h1>{props.item.product.name}</h1></Link>
        <img src={props.item.product.image_URL} />
      </div>
      <div>
        <h3>{props.item.name}</h3>
        <p>Price: {props.item.product.price}</p> {/*to be in price format; 
        make a folder for utility functions for this kind of thing?*/}
        <p>Ouantity: {props.item.quantity}</p>
        <button type="button" onClick={() => props.removeLineItem(props.item.id)}>Delete Item</button>
      </div>
    </div>
  )
}

export default ItemPreview

// const mapDispatch = { removeLineItem }

// export default withRouter(connect(null, mapDispatch)(ItemPreview))