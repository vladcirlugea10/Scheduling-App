import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RegisterUser from './Pages/Register/RegisterUser/RegisterUser';
import RegisterBusiness from './Pages/Register/RegisterBusiness/RegisterBusiness';
import RoleChooser from './Pages/Register/RoleChooser/RoleChooser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/role-chooser" element={<RoleChooser />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-business" element={<RegisterBusiness />} />
      </Routes>
    </Router>
  );
}

export default App;
