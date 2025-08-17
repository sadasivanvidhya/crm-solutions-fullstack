import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client.js';

export default function CustomerForm(){
  const { id } = useParams();
  const nav = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', notes:'' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await api.get(`/customers/${id}`);
        setForm({ name:data.name, email:data.email, phone:data.phone, company:data.company||'', notes:data.notes||'' });
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      }
    })();
  }, [id]);

  async function onSubmit(e){
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) await api.put(`/customers/${id}`, form);
      else await api.post('/customers', form);
      nav('/customers');
    } catch (e) {
      const msg = e.response?.data?.message || e.response?.data?.errors?.[0]?.msg || e.message;
      setError(msg);
    }
  }

  return (
    <div className="card">
      <h2>{isEdit ? 'Edit Customer' : 'New Customer'}</h2>
      <form className="grid" onSubmit={onSubmit}>
        <div className="grid cols-2">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })} />
        </div>
        <div className="grid cols-2">
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({ ...form, phone:e.target.value })} />
          <input className="input" placeholder="Company" value={form.company} onChange={e=>setForm({ ...form, company:e.target.value })} />
        </div>
        <textarea className="input" rows="4" placeholder="Notes" value={form.notes} onChange={e=>setForm({ ...form, notes:e.target.value })} />
        {error && <div style={{ color:'#f87171' }}>{error}</div>}
        <div style={{ display:'flex', gap:'.5rem' }}>
          <button className="btn">Save</button>
          <button type="button" className="btn secondary" onClick={()=>nav('/customers')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
