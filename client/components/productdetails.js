import React from 'react'
import {Link} from 'react-router-dom'
import {formatPrice} from '../util'

export default function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <div className="product-name">
        <Link to={`/products/${product.id}`}>
          <h1>{product.name}</h1>
        </Link>
      </div>
      <img src={product.image_URL} />
      <ul>
        <li>Price: {formatPrice(product.price)}</li>
        <li>Description: {product.description}</li>
        <li>Category: {product.category}</li>
      </ul>
    </div>
  )
}
