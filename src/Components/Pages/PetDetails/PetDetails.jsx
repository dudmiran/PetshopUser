import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PetDetails.css';

const PetDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pet = state?.item;

  if (!pet) {
    return <div>Pet not found</div>;
  }

  const handleProceedToBuy = () => {
    navigate('/orders', { state: { pet } });
  };

  return (
    <div className="pet-detail-container">
      <img src={`http://localhost:5000/images/${pet.image}`} alt={pet.name} className="pet-detail-image" />
      <h2 className="pet-name">{pet.name}</h2>
      <p className="pet-description">{pet.description}</p>
      <p className="pet-price">Price: ${pet.price}</p>
      <button className="proceed-to-buy-button" onClick={handleProceedToBuy}>Proceed to Buy</button>
    </div>
  );
};

export default PetDetails;
