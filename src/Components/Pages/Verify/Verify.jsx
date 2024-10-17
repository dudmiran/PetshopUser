import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css';

const Verify = () => {
  const  url  = "http://localhost:5000";
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });
  console.log("response", response)
      if (response.data.success) {
        navigate("/myorder");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
