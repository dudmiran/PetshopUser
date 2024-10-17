import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServiceStatus.css'; // Create CSS for styling
    
const ServiceStatus = () => {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Get the user ID from local storage
    const url = 'http://localhost:5000';
    
    console.log("inside service")
    const fetchServiceRequests = async () => {
        // if (!token || !userId) return; // If no token or user ID is found, return early

        try {
            const response = await axios.get(`http://localhost:5000/api/servicerequest/requests`);
            
            const userIds = response.data.map(request => request.user._id);
            console.log("All User IDs from response:", userIds);
        
            // Get the userId from local storage
            const userId = localStorage.getItem('userid'); 
            console.log("userid from localstorage",userId )// Make sure to use the correct key you stored the userId with
            
            // Check if the userId is present in userIds
            if (userIds.includes(userId)) {
                console.log("User ID matches:", userId);
                
                // Filter the requests by userId
                const filteredRequests = response.data.filter(request => request.user._id === userId);
                console.log("Filtered requests:", filteredRequests);
                
                setRequests(filteredRequests); // Update state with filtered requests
            } else {
                console.log("User ID does not match any request IDs.");
                setRequests([]); // Optionally set an empty array if no match is found
            }
        } catch (error) {
            console.error("Error fetching service requests:", error);
        }
        
    };
    
    useEffect(() => {
        fetchServiceRequests(); // Call the fetch function
    }, [token, userId]); // Dependency array includes token and userId
    
    return (
        <div className="service-status">
        <h2>My Service Requests</h2>
        <div className="requests-container">
            {requests.length > 0 ? (
                requests.map((request) => (
                    <div key={request?._id} className="request-card">
                        <div className="request-details">
                            <p className="service-name">{request?.service?.name}</p>
                            <p className="service-price">Price: ${request?.service?.price}.00</p>
                            <p className="service-status">
                                <b>{request.status}</b>
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-requests">No service requests found</p>
            )}
        </div>
    </div>
);
};
    
export default ServiceStatus;
