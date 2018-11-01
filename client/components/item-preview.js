import React from 'react'

//Used for cart items and product listing items, maybe?

const ItemPreview = ({ item }) => {
  return (
    <div id='item-preview-container'> {/*will be a flexbox!*/}
      <div>
        <img href={item.image_URL} />
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>Price: {item.price}</p> {/*to be in price format; 
        make a folder for utility functions for this kind of thing?*/}
        <p>{item.quantity}</p>
      </div>
    </div>
  )
}

export default ItemPreview