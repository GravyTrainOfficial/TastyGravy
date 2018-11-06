/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { Login, Signup } from './auth-form'
export { default as ProductListing } from './productlisting'
export { default as ProductDetails } from './productdetails'
export { default as AddProduct } from './addProduct'
export { default as SingleProduct } from './single-product'
export { default as Cart } from './cart'
export { default as ItemPreview } from './item-preview'
export { default as OrderHistory } from './orderhistory'
export { default as Checkout } from './checkout'
export { default as CheckoutForm } from './checkout-form'
export { default as GetGuestEmail } from './get-guest-email'


