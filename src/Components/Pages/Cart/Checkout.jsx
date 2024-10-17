import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const pet = navigate.state?.pet || {}; // Get the pet details passed via state

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Default payment method

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        petId: pet._id,
        address,
        paymentMethod,
      });

      if (response.data.success) {
        alert('Purchase successful!');
        navigate('/thank-you'); // Redirect to a thank-you page or order confirmation
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="pet-details">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        <h3>{pet.name}</h3>
        <p>{pet.description}</p>
        <p>${pet.price}</p>
      </div>

      <div className="checkout-form">
        <div className="form-group">
          <label htmlFor="address">Shipping Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            name="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button className="checkout-button" onClick={handleCheckout}>
          Confirm and Buy
        </button>
      </div>
    </div>
  );
};

export default Checkout;
