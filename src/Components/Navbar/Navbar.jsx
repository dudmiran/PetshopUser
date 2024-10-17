import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Pages/Cart/CartContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const { cartItems } = useCart();

  // Ensure cartItems is an array before using reduce
  const cartItemCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("userid")
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">PetStore</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart">
          Cart
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/myorder">My Orders</Link>
            <Link to="/servicestatus">Service Status</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
          
          
          
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

