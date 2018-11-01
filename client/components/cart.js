import React from 'react'
import { CartItem } from './index'

const dummyItems = [
  {
    name: 'bad gravy',
    description: 'go away',
    price: 0.5,
    inventoryQuantity: 10,
    image_URL: 'https://cdn.shopify.com/s/files/1/2382/0223/products/30873-1_73d9e0c4-6737-4d59-a425-35536ad6c131_200x200.jpg?v=1526529402'
  },
  {
    name: 'i hate gravy',
    description: 'i hate products',
    price: 99.99,
    inventoryQuantity: 99,
    image_URL: 'https://cdn.shopify.com/s/files/1/2382/0223/products/30873-1_73d9e0c4-6737-4d59-a425-35536ad6c131_200x200.jpg?v=1526529402'
  }
]

const Cart = (props) => {
  props.products = dummyItems // delete when not using dummy data, obviously
  return (
    <div>
      <h1>My Cart</h1>
    {props.products.map(item => <ItemPreview item={item} />)}
    </div>
  )
}



export default Cart