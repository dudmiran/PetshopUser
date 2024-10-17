import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PetFoodDetails.css'; // Ensure you create this CSS file

const PetFoodDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const food = location.state?.food || {};

  const handleProceedToBuy = () => {
    // Navigate to the checkout page or handle the purchase process
    navigate('/delivery-information', { state: { food } });
  };

  return (
    <div className="pet-food-details-container">
      <h2>Pet Food Details</h2>
      <div className="pet-food-details">
        <img src={food.image} alt={food.name} className="pet-food-image" />
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>${food.price}</p>
      </div>
      <button className="proceed-button" onClick={handleProceedToBuy}>
        Proceed to Buy
      </button>
    </div>
  );
};

export default PetFoodDetails;