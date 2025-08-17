import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <div className="brand"><Link to="/customers">CRM</Link></div>
      <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
        {user ? (
          <>
            <span style={{ opacity:.8 }}>Hi, {user.name}</span>
            <Link to="/customers" className="btn secondary">Customers</Link>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn secondary">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
