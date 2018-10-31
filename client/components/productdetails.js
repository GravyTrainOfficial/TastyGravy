import React from 'react'

export default function ProductDetails(props) {
  return (
    <td key={props.product.id}>
      {props.product.firstName}
      <ul>
        <li>{props.product.lastName}</li>
        <li>{props.product.email}</li>
      </ul>
    </td>
  )
}
