import React from 'react'

export default function ProductDetails(props) {
  return (
    <li key={props.product.id}>
      {props.product.name}
      <img src={props.product.image_Url} />
      <ul>
        <li>{props.product.description}</li>
        <li>{props.product.category}</li>
      </ul>
    </li>
  )
}
