import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Deliveryinformation.css'; // Ensure you have this CSS file for styling

const DeliveryInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pet = location.state?.pet || {};

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleAddressLine1Change = (e) => {
    setAddressLine1(e.target.value);
  };

  const handleAddressLine2Change = (e) => {
    setAddressLine2(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProceedToPayment = () => {
    navigate('/orders', {
      state: { 
        pet, 
        address: { 
          addressLine1, 
          addressLine2, 
          city, 
          state, 
          postalCode 
        }, 
        contactNumber, 
        email 
      }
    });
  };

  return (
    <div className="delivery-information-container">
      <h2>Delivery Information</h2>
      <div className="delivery-form">
        <div className="form-group">
          <label htmlFor="address-line-1">Address Line 1</label>
          <input
            type="text"
            id="address-line-1"
            value={addressLine1}
            onChange={handleAddressLine1Change}
            required
          />
        </div>
        <br></br>

        <div className="form-group">
          <label htmlFor="address-line-2">Address Line 2 (optional)</label>
          <input
            type="text"
            id="address-line-2"
            value={addressLine2}
            onChange={handleAddressLine2Change}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={handleStateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-number">Contact Number</label>
          <input
            type="tel"
            id="contact-number"
            value={contactNumber}
            onChange={handleContactNumberChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <button className="proceed-button" onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default DeliveryInformation;
