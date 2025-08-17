import React, { useState } from 'react';
import api from '../api/client.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const { login } = useAuth();

  async function onSubmit(e){
    e.preventDefault();
    setError(null);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      nav('/customers');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message;
      setError(msg);
    }
  }

  return (
    <div className="card">
      <h2>Create account</h2>
      <form className="grid" onSubmit={onSubmit}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} />
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({ ...form, password:e.target.value })} />
        {error && <div style={{ color:'#f87171' }}>{error}</div>}
        <button className="btn">Register</button>
      </form>
    </div>
  );
}
