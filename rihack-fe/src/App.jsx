import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { toast } from 'react-toastify';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Reports from './pages/Reports';
import BackOffice from './pages/BackOffice';
import AddReport from './pages/AddReport';
import Map from './pages/Map';

function App() {
  useEffect(() => {
    toast.configure({
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: false,
      toastClassName: 'pop-notification',
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/backoffice" element={<BackOffice />} />
        <Route path="/map" element={<Map />} />
        <Route authorized path="/add-report" element={<AddReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
