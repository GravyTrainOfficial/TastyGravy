import React from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../util'

export function ProductDetails({ product }) {
  return (
    <div className="productDetails">
      <img className='productImage' src={product.image_URL} />
      <div className="productName">
        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
      </div>
      <p>Price: {formatPrice(product.price)}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
    </div>
  )
}

export default ProductDetails