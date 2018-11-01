import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductDetails(props) {
  return (
    <div key={props.product.id}>
      <Link to={`/products/${props.product.id}`} ><h1>{props.product.name}</h1></Link>
      <img src={props.product.image_URL} />
      <ul>
        <li>{props.product.description}</li>
        <li>{props.product.category}</li>
        <li>{props.product.price}</li>
      </ul>
    </div>
  )
}
