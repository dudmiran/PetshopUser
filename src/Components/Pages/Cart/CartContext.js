import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState();
  const [food_list, setFoodList] = useState([]);
  const [pet_list, setPetList] = useState([])

  const addToCart = async (item) => {
    const itemId = item._id;
    console.log("Adding item with ID:", itemId);
    try {
      setCartItems((prev) => {
        const newItem = prev[itemId]
          ? { ...prev[itemId], quantity: prev[itemId].quantity + 1 }
          : { ...item, quantity: 1 };
        return { ...prev, [itemId]: newItem };
      });
      
      if (token) {
        console.log("Request payload:", { itemId });
        const response = await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        if (response.data.success) {
          console.log("Item added successfully.");
        } else {
          console.error("Failed to add item:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((total, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return total + itemTotal;
    }, 0);
  };

  const fetchPetFoods = async () => {
    const response = await axios.get('http://localhost:5000/api/petfeed/listfeed');
    console.log("feeeeeed", response)
    setFoodList(Array.isArray(response.data.data) ? response.data.data : response.data.petFoods);
  }; // Ensure this is properly closed

  const fetchPetDetails = async () => {
    const response = await axios.get('http://localhost:5000/api/dog/list');
    console.log("dogg", response)
    setPetList(Array.isArray(response.data.data) ? response.data.data : response.data.petFoods);
  };
  const loadCartData = async (token) => {
    const response = await axios.get(`${url}/api/cart/get`, { headers: { token } });
    if (response.data.cartData) {
      setCartItems(response.data.cartData);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[itemId];
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPetFoods();
      await fetchPetDetails();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems,food_list, addToCart, removeFromCart, clearCart, getTotalCartAmount , pet_list}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
