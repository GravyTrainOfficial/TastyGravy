import React from 'react'

export default function ProductDetails(props) {
  return (
    <td key={props.product.id}>
      {props.product.name}
      <ul>
        <li>{props.product.description}</li>
        <li>{props.product.category}</li>
      </ul>
    </td>
  )
}
