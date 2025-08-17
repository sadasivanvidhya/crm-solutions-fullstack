import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Customers from './pages/Customers.jsx';
import CustomerForm from './pages/CustomerForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App(){
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}> 
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerForm />} />
        </Route>

        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="*" element={<div className="card">Not Found</div>} />
      </Routes>
    </div>
  );
}
