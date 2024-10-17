import React, { useState, useContext, useEffect } from 'react';
import './MyOrder.css'; // Ensure to import the new styles
import axios from 'axios';

const MyOrder = () => {
    const [data, setData] = useState([]);
    const url = 'http://localhost:5000'
    const token = localStorage.getItem("token")

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            console.log("orders", response)
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        // <div className='my-orders'>
        //     <h2 className='orders-title'>My Orders</h2>
        //     <div className="orders-container">
        //         {data?.map((order, index) => (
        //             <div key={index} className='order-card'>
        //                 <div className='order-details'>
        //                     <p className='order-items'>
        //                         {order.items.map((item, index) => (
        //                             index === order.items.length - 1
        //                                 ? `${item.name} x ${item.quantity}`
        //                                 : `${item.name} x ${item.quantity}, `
        //                         ))}
        //                     </p>
        //                     <p className='order-amount'>{order.amount}.00</p>
        //                     <p className='order-items-count'>Items: {order.items.length}</p>
        //                     <p className='order-status'>
        //                         <span>&#x25cf;</span> <b>{order.status}</b>
        //                     </p>
        //                 </div>
        //                 <button className='track-button' onClick={fetchOrders}>Track Order</button>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
          {data?.map((order,index)=>{
            return (
              <div key={index} className='my-orders-order'>
                  <p>{order.items.map((item,index)=>{
                    if (index === order.items.length-1) {
                      return item.name+" x "+item.quantity
                    }
                    else{
                      return item.name+" x "+item.quantity+", "
                    }
                    
                  })}</p>
                  <p>{order?.amount}.00</p>
                  <p>Items: {order?.items?.length}</p>
                  <p><span>&#x25cf;</span> <b>{order?.status}</b></p>
                  <button onClick={fetchOrders}>Track Order</button>
              </div>
              
            )
          })}
        
        </div>
       
      </div>
    );
};

export default MyOrder;
