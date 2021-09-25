import React from 'react';
import './Cart.css'

const Cart = (props) => {
    console.log(props.cart)
    const{cart} =props
    let totalQuantity = 0
    let total = 0
    for(const product of cart){
      if(!product.quantity){
        product.quantity = 1
      }
        total = total + product.price * product.quantity
        totalQuantity = totalQuantity + product.quantity
        // console.log(total)
    }
    const shipping = total>0 ? 15 : 0
    const tax = (total+shipping)*0.10
    const grandtotal = total + shipping + tax
    return (
      <div>
        <h3>Order Summary</h3>
        <h5>Items Ordered: {totalQuantity} </h5>
        <br />
        <p>Total: {total.toFixed(2)}</p>
        <p>Shipping: {shipping}</p>
        <p>Tax: {tax.toFixed(2)}</p>
        <p>Grandtotal: {grandtotal.toFixed(2)}</p>
      </div>
    );
};

export default Cart;