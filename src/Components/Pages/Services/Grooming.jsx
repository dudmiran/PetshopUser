import React, { useEffect, useState } from 'react';
import './Service.css';
import axios from 'axios';
import Groom1 from "../../../assets/groom1.jpg";
import Groom2 from "../../../assets/groom2.jpg";
import Groom3 from "../../../assets/groom3.webp";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Grooming = () => {
  const [appointment, setAppointment] = useState({
    date: '',
    details: '',
    petDetails: '',
    preferences: '',
    time: '10:00', // Default time
  });
  const [showForm, setShowForm] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [userId, setUserId] = useState('');
const navigate = useNavigate()
  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (e) => {
    setAppointment({ ...appointment, time: e.target.value });
  };

  useEffect(() => {
    const fetchServiceId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service/listservice');
        const groomingService = response.data.find(service => service.name === 'Grooming');
        if (groomingService) {
          setServiceId(groomingService._id);
        }
      } catch (error) {
        console.error('Error fetching service ID:', error);
      }
    };

    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchServiceId();
console.log("ser user", serviceId,userId)

  }, []);
console.log("ser user", serviceId,userId)
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!serviceId || !userId) {
      console.error('Service ID or User ID is missing');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/servicerequest/request', {
        serviceId,
        userId,
        details: appointment.details,
        petDetails: appointment.petDetails,
        preferences: appointment.preferences,
        date: appointment.date,
        time: appointment.time,
      });
      console.log('Appointment requested:', response.data);
      toast.success('Appointment booked successfully!');
      navigate("/servicestatus");
    } catch (error) {
      console.error('Error requesting appointment:', error);
      toast.error('Failed to book the appointment. Please try again.');
    }
  };

  const handleAppointmentClick = () => {
    setShowForm(true);
  };

  return (
    <div className="service-container">
          <ToastContainer />
      <div className="grooming-images">
        <img src={Groom1} alt="Grooming Facility 1" />
        <img src={Groom2} alt="Grooming Facility 2" />
        <img src={Groom3} alt="Grooming Facility 3" />
      </div>

      <div className="grooming-details">
        <h2>Grooming Service</h2>
        <p>Professional grooming services for your pet.</p>
        <p>Our grooming packages include bathing, trimming, and styling to keep your pet looking its best.</p>
        <p>Facilities include:</p>
        <ul>
          <li>Experienced groomers</li>
          <li>High-quality grooming products</li>
          <li>Safe and comfortable environment</li>
        </ul>
        <p>Price: $50</p>

        <button className="appointment-button" onClick={handleAppointmentClick}>
          Request Appointment
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="appointment-form">
            <input
              type="date"
              name="date"
              value={appointment.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={appointment.time}
              onChange={handleTimeChange}
              required
            />
            <input
              type="text"
              name="petDetails"
              placeholder="Pet Details"
              value={appointment.petDetails}
              onChange={handleChange}
              required
            />
            <textarea
              name="preferences"
              placeholder="Preferences"
              value={appointment.preferences}
              onChange={handleChange}
            />
            <textarea
              name="details"
              placeholder="Additional Details"
              value={appointment.details}
              onChange={handleChange}
            />
            <button type="submit" className="request-button">Book Appointment</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Grooming;
