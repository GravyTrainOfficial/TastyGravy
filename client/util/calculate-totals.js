import { totalmem } from "os";

export const calculateProductTotal = ({ quantity, product: { price } }) => {
  return quantity * price
}

export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + calculateProductTotal(item), 0)
}