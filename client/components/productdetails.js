import React from 'react'

export default function ProductDetails(props) {
  return (
    <li key={props.product.id}>
      {props.product.name}
      <img src={props.product.image_URL} />
      <ul>
        <li>{props.product.description}</li>
        <li>{props.product.category}</li>
        <li>{props.product.price}</li>
      </ul>
    </li>
  )
}
