import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for React-Toastify
import './Home.css';

const Home = () => {
  const [pets, setPets] = useState([]);
  const [petFoods, setPetFoods] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dog/list');
        setPets(Array.isArray(response.data.data) ? response.data.data : response.data.pets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    const fetchPetFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/petfeed/listfeed');
        setPetFoods(Array.isArray(response.data.data) ? response.data.data : response.data.petFoods);
      } catch (error) {
        console.error('Error fetching pet foods:', error);
      }
    };

    fetchPets();
    fetchPetFoods();
  }, []);

  const handleBuyNow = (item, type) => {
    navigate(type === 'pet' ? '/pet-details' : '/pet-food-details', { state: { item } });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success('Item added to cart!');
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <h1>Welcome to PetStore</h1>
        <p>Your one-stop shop for pets, pet food, and pet services.</p>
        <button className="shop-now-button">Shop Now</button>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-card" onClick={() => window.location.href='/breeding'}>
            <h3>Breeding</h3>
            <p>Find the perfect breeder for your next pet.</p>
          </div>
          <div className="service-card" onClick={() => window.location.href='/grooming'}>
            <h3>Grooming</h3>
            <p>Keep your pet looking and feeling great.</p>
          </div>
          <div className="service-card" onClick={() => window.location.href='/boarding'}>
            <h3>Boarding</h3>
            <p>Safe and comfortable boarding for your pet.</p>
          </div>
        </div>
      </section>

      <section className="pets-section">
        <h2>Available Pets</h2>
        <div className="pets-list">
  {Array.isArray(pets) && pets.length > 0 ? (
    pets.map(pet => (
      <div key={pet._id} className="pet-card">
        <img src={`http://localhost:5000/images/${pet.image}`} alt={pet.name} className="pet-image" />
        <h3>{pet.name}</h3>
        <p>{pet.description}</p>
        <p>${pet.price}</p>
        {/* <button className="buy-now-button" onClick={() => handleBuyNow(pet, 'pet')}>Buy Now</button> */}
        <button className="add-to-cart-button" onClick={() => handleAddToCart(pet)}>Add to Cart</button>
      </div>
    ))
  ) : (
    <p>No pets available.</p>
  )}
</div>

      </section>

      <section className="petfoods-section">
        <h2>Pet Food</h2>
        <div className="petfoods-list">
          {Array.isArray(petFoods) && petFoods.length > 0 ? (
            petFoods.map(food => (
              <div key={food._id} className="petfood-card">
                <img src={`http://localhost:5000/images/${food.image}`} alt={food.name} className="petfood-image" />

                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <p>${food.price}</p>
                {/* <button className="buy-now-button" onClick={() => handleBuyNow(food, 'food')}>Buy Now</button> */}
                <button className="add-to-cart-button" onClick={() => handleAddToCart(food)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No pet food available.</p>
          )}
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Home;
