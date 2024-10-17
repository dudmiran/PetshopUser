// import React from 'react';
// import { useCart } from './CartContext';
// import { useNavigate } from 'react-router-dom';
// import './Cart.css'; // Ensure this file exists for styling

// const Cart = () => {
//   const { cart = [], removeFromCart, clearCart } = useCart(); // Default cart to empty array
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     navigate('/delivery-information');
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       {cart.length > 0 ? (
//         <div className="cart-items">
//           {cart.map((item) => (
//             <div key={item._id} className="cart-item">
//               <img src={item.image} alt={item.name} className="cart-item-image" />
//               <div className="cart-item-details">
//                 <h3>{item.name}</h3>
//                 <p>${item.price}</p>
//                 <button onClick={() => removeFromCart(item._id)} className="remove-button">Remove</button>
//               </div>
//             </div>
//           ))}
//           <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
//           <button className="clear-button" onClick={clearCart}>Clear Cart</button>
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React,  {useEffect, useState} from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);


  const hasItems = Object.keys(cartItems).length > 0;

  console.log("cart items", cartItems)
  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if (!hasItems) {
      setShowEmptyMessage(true);
    } else {
      setShowEmptyMessage(false);
    }
  }, [hasItems]);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {hasItems ? (
  Object.keys(cartItems).map((itemId) => {
    const item = cartItems[itemId];
    return (
      <div key={itemId} className="cart-items-item">
       
        <p>{item.name}</p>
        <p>${item.price}</p>
        <p>{item.quantity}</p>
        <p>${(item.price * item.quantity)}</p>
        <p onClick={() => removeFromCart(itemId)} className="remove">x</p>
        <hr />
      </div>
    );
  })
) : (
  <div className="empty-cart-message animated">
    <p>Your cart is empty.</p>
  </div>
)}
      </div>

      {hasItems && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${(getTotalCartAmount()).toFixed(2)}</b>
            </div>
            <button onClick={() => navigate('/orders')} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
