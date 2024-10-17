import React, { useState } from 'react';
import './QuantityPopUp.css';

const QuantityPopup = ({ item, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart(item, quantity);
    onClose();
  };

  return (
    <div className="quantity-popup">
      <div className="popup-content">
        <h3>Select Quantity</h3>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
        <button onClick={handleAdd}>Add to Cart</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default QuantityPopup;
