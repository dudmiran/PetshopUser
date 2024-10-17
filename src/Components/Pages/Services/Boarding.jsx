import React, { useEffect, useState } from 'react';
import './Service.css';
import axios from 'axios';
import Board1 from "../../../assets/board1.jpg";
import Board2 from "../../../assets/board2.jpg";
import Board3 from "../../../assets/board3.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Boarding = () => {
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
  const navigate = useNavigate();

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
        console.log(response.data);
        const boardingService = response.data.find(service => service.name === 'Boarding');
        if (boardingService) {
          console.log('Service ID:', boardingService._id);
          setServiceId(boardingService._id);
        }
      } catch (error) {
        console.error('Error fetching service ID:', error);
      }
    };

    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      console.log('User ID:', storedUserId);
      setUserId(storedUserId);
    }

    fetchServiceId();
  }, []);

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

      // Reset the form and hide it
      setAppointment({
        date: '',
        details: '',
        petDetails: '',
        preferences: '',
        time: '10:00',
      });
      setShowForm(false);
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
      <div className="boarding-images">
        <img src={Board1}  alt="Boarding Facility 1" />
        <img src={Board2} alt="Boarding Facility 2" />
        {/* <img src={Board3} style={{width:"20px"}} alt="Boarding Facility 3" /> */}
      </div>

      <div className="boarding-details">
        <h2>Boarding Service</h2>
        <p>Safe and comfortable boarding for your pet.</p>
        <p>We provide a home away from home with our top-notch boarding facilities.</p>
        <p>Facilities include:</p>
        <ul>
          <li>Spacious kennels</li>
          <li>24/7 supervision</li>
          <li>Individualized care and attention</li>
        </ul>
        <p>Price: $75 per night</p>

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

export default Boarding;
