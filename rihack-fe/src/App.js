import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { toast } from 'react-toastify';
import Signup from './pages/Signup';
import Home from './pages/Home';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
