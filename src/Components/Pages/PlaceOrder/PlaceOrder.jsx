import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { CartContext } from '../Cart/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const [payment, setPayment] = useState("cod");
    const { food_list, cartItems, setCartItems, deliveryCharge, pet_list } = useContext(CartContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem("token");
    const url = "http://localhost:5000";
    console.log("Food List:", food_list);
console.log("Cart Items:", cartItems);


    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const getTotalCartAmount = () => {
        return Object.values(cartItems).reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 0);
            return total + itemTotal;
        }, 0);
    };

    const totalAmount = getTotalCartAmount() + (deliveryCharge || 0);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^[0-9]{9,12}$/.test(phone);
    };

    const validateZipcode  = (zipcode) => {
        return /^[0-9]{4,6}$/.test(zipcode)
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));

        // Inline validation
        let newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors[name] = `${name} is required`;
        } else if (name === 'email' && !validateEmail(value)) {
            newErrors.email = 'Invalid email address';
        } else if (name === 'phone' && !validatePhone(value)) {
            newErrors.phone = 'Invalid phone number';
        }else if (name === 'zipcode' && !validateZipcode(value)){
            newErrors.zipcode = 'Invalid zipcode'
        } 
        else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const validateForm = () => {
        let newErrors = {};
        Object.keys(data).forEach((key) => {
            if (data[key].trim() === '') {
                newErrors[key] = `${key} is required`;
            }
        });

        if (data.email && !validateEmail(data.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (data.phone && !validatePhone(data.phone)) {
            newErrors.phone = 'Invalid phone number';
        }
        if (data.zipcode && !validateZipcode(data.zipcode)){
            newErrors.zipcode = 'Invalid zipcode'
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        let orderItems = [];
        if (Array.isArray(food_list)) {
            food_list.forEach(item => {
                if (cartItems[item._id]) {
                    orderItems.push({ ...item, quantity: cartItems[item._id].quantity });
                }
            });
        }
    
        if (Array.isArray(pet_list)) {
            pet_list.forEach(item => {
                if (cartItems[item._id]) {
                    orderItems.push({ ...item, quantity: cartItems[item._id].quantity });
                }
            });
        }
        console.log("Collected Order Items:", orderItems);
        if (orderItems.length === 0) {
            alert("No items in your cart.");
            return;
        }
        let orderData = {
            address: data,
            items: orderItems,
            amount: totalAmount,
        };
    
        console.log("Order Data:", orderData);

        if (payment === "stripe") {
            console.log("order dataaa", orderData)
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                window.location.replace(response.data.session_url);
            } else {
                alert("Something Went Wrong");
            }
        } else {
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders");
                alert(response.data.message);
                setCartItems({});
            } else {
                alert("Something Went Wrong");
            }
        }
    };

    useEffect(() => {
        if (!token) {
            alert("To place an order, sign in first");
            navigate('/');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            {/* Delivery Information Section */}
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                <br />
                <br /> 

                {errors.firstName && <p className="error">{errors.firstName}</p>}
                <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                <br />
                <br /> 
                {errors.lastName && <p className="error">{errors.lastName}</p>}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <br />
                <br /> 
                {errors.email && <p className="error">{errors.email}</p>}
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <br />
                <br /> 
                {errors.street && <p className="error">{errors.street}</p>}
                <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                <br />
                <br /> 
                {errors.city && <p className="error">{errors.city}</p>}
                <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                <br />
                <br /> 
                {errors.state && <p className="error">{errors.state}</p>}
                <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                <br />
                <br /> 
                {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                <br />
                <br /> 
                {errors.country && <p className="error">{errors.country}</p>}
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
                <br />
                <br /> 
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            {/* Order Summary Section */}
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className='cart-total-details'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount().toFixed(2)}</p>
                    </div>
                    <div className='cart-total-details'>
                        <p>Delivery Fees</p>
                        <p>${deliveryCharge || 0}</p>
                    </div>
                    <div className='cart-total-details'>
                        <b>Total</b>
                        <b>${totalAmount.toFixed(2)}</b>
                    </div>
                </div>
                <div className="payment">
                    {/* <div onClick={() => setPayment("stripe")} className="payment-option">
                        <p>Stripe ( Credit / Debit )</p>
                    </div> */}.
                    <div 
                        onClick={() => setPayment("stripe")} 
                        className={`payment-option ${payment === "stripe" ? "selected" : ""}`}
                    >
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <br />
                <button className='place-order-submit' type='submit'>{payment === "cod" ? "Place Order" : "Proceed To Payment"}</button>
            </div>
        </form>
    );
};

export default PlaceOrder;

