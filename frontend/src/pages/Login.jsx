import React, { useState } from 'react';
import api from '../api/client.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const loc = useLocation();
  const { login } = useAuth();

  async function onSubmit(e){
    e.preventDefault();
    setError(null);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      const dest = loc.state?.from?.pathname || '/customers';
      nav(dest, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message;
      setError(msg);
    }
  }

  return (
    <div className="card">
      <h2>Welcome back</h2>
      <form className="grid" onSubmit={onSubmit}>
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({ ...form, password:e.target.value })} />
        {error && <div style={{ color:'#f87171' }}>{error}</div>}
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
