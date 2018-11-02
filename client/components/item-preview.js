import React from 'react'
import { Link } from 'react-router-dom'


//Used for cart items and product listing items, maybe?

const ItemPreview = ({ item }) => {
  return (
    <div id='item-preview-container'> {/*will be a flexbox!*/}
      <div key={item.id}>
        <Link to={`/products/${item.product.id}`} ><h1>{item.product.name}</h1></Link>
        <img src={item.product.image_URL} />
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>Price: {item.product.price}</p> {/*to be in price format; 
        make a folder for utility functions for this kind of thing?*/}
        <p>Ouantity: {item.quantity}</p>
      </div>
    </div>
  )
}

export default ItemPreview