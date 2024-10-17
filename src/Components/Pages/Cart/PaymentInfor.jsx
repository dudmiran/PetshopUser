import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentInformation.css'; // Ensure this file exists for styling

const PaymentInfor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pet, address } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleConfirmPurchase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        petId: pet._id,
        address,
        paymentMethod,
        cardNumber,
        expirationDate,
        cvv,
      });

      if (response.data.success) {
        alert('Purchase successful!');
        navigate('/thank-you');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
    navigate('/thank-you');
  };

  return (
    <div className="payment-information-container">
      <h2>Payment Information</h2>
      <div className="payment-form">
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

        {paymentMethod === 'Credit Card' && (
          <>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiration-date">Expiration Date</label>
              <input
                type="text"
                id="expiration-date"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                required
              />
            </div>
          </>
        )}

        <button className="confirm-button" onClick={handleConfirmPurchase}>
          Confirm and Buy
        </button>
      </div>
    </div>
  );
};

export default PaymentInfor;
