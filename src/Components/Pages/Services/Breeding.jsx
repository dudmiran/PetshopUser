import React, { useEffect, useState } from 'react';
import './Service.css';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import Breed1 from "../../../assets/breed1.jpg";
import Breed2 from "../../../assets/breed2.webp";
import Breed3 from "../../../assets/breed3.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Breeding = () => {
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

  const handleTimeChange = (time) => {
    setAppointment({ ...appointment, time });
  };

  useEffect(() => {
    const fetchServiceId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service/listservice');
        const breedingService = response.data.find(service => service.name === 'Breeding');
        if (breedingService) {
          setServiceId(breedingService._id);
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
      navigate("/servicestatus")
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
      <div className="breeding-images">
        <img src={Breed1} alt="Breeding Facility 1" />
        <img src={Breed2} alt="Breeding Facility 2" />
        <img src={Breed3} alt="Breeding Facility 3" />
      </div>

      <div className="breeding-details">
        <h2>Breeding Service</h2>
        <p>Find the perfect breeder for your next pet.</p>
        <p>We offer a range of breeding services to ensure the healthiest and happiest pets.</p>
        <p>Facilities include:</p>
        <ul>
          <li>Experienced and certified breeders</li>
          <li>High-quality care and nutrition</li>
          <li>Safe and comfortable breeding environments</li>
        </ul>
        <p>Price: $100</p>

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
              onChange={handleChange}
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

export default Breeding;
