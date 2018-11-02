import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductDetails(props) {
  return (
    <div className='productDetails' key={props.product.id}>
      <div className='productName'>
        <Link to={`/products/${props.product.id}`} ><h1>{props.product.name}</h1></Link>
      </div>
      <img src={props.product.image_URL} />
      <ul>
        <li>{props.product.description}</li>
        <li>{props.product.category}</li>
        <li>{props.product.price}</li>
      </ul>
    </div>
  )
}
