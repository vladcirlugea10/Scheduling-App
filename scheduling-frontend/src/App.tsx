import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RegisterUser from './Pages/Register/RegisterUser/RegisterUser';
import RegisterBusiness from './Pages/Register/RegisterBusiness/RegisterBusiness';
import RoleChooser from './Pages/Register/RoleChooser/RoleChooser';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import AuthProvider, { useAuth } from './Hooks/useAuth';
import BusinessDashboard from './Pages/BusinessDashboard/BusinessDashboard';
import ProtectedRoutes from './Utils/ProtectedRoutes';

const App = () => {
  return (
    <>
      <AuthProvider>
        
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/role-chooser" element={<RoleChooser />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-business" element={<RegisterBusiness />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route path='/business-dashboard' element={<BusinessDashboard />}/>
          </Route>
        </Routes>
      </Router>

      </AuthProvider>
    </>
  );
}

export default App;
