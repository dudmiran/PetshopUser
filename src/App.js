import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Register from './Components/Pages/Auth/Register';
import Login from './Components/Pages/Auth/Login';
import Navbar from './Components/Navbar/Navbar';
import Breeding from './Components/Pages/Services/Breeding';
import Grooming from './Components/Pages/Services/Grooming';
import Boarding from './Components/Pages/Services/Boarding';
import Checkout from './Components/Pages/Cart/Checkout';
import DeliveryInformation from './Components/Pages/Cart/DeliveryInformation';
import PaymentInfor from './Components/Pages/Cart/PaymentInfor';
import PetDetails from './Components/Pages/PetDetails/PetDetails';
import PetFoodDetails from './Components/Pages/PetFoodDetails/PetFoodDetails';
import { CartProvider } from './Components/Pages/Cart/CartContext';
import Cart from './Components/Pages/Cart/Cart';
import PlaceOrder from './Components/Pages/PlaceOrder/PlaceOrder';
import MyOrder from './Components/Pages/MyOrder/MyOrder';
import Verify from './Components/Pages/Verify/Verify';
import ServiceStatus from './Components/Pages/ServiceStatus/ServiceStatus';

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breeding" element={<Breeding />} />
            <Route path="/grooming" element={<Grooming />} />
            <Route path="/boarding" element={<Boarding />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery-information" element={< DeliveryInformation/>} />
            <Route path="/payment-information" element={< PaymentInfor/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pet-details" element={<PetDetails />} />
            <Route path="/pet-food-details" element={<PetFoodDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/orders' element={<PlaceOrder />} />
            <Route path='/myorder' element={<MyOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/servicestatus' element={<ServiceStatus />} />




          </Routes>
        </div>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
