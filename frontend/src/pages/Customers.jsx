import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';

export default function Customers(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load(){
    try {
      setLoading(true);
      const { data } = await api.get('/customers');
      setRows(data);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
        <h2>Customers</h2>
        <Link className="btn" to="/customers/new">Add Customer</Link>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color:'#f87171' }}>{error}</div>}

      {!loading && rows.length === 0 && <div>No customers yet.</div>}

      {rows.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.company || '-'}</td>
                <td style={{ display:'flex', gap:'.5rem' }}>
                  <Link className="btn secondary" to={`/customers/${r._id}`}>Edit</Link>
                  <button className="btn" onClick={async ()=>{ if(confirm('Delete customer?')){ await api.delete(`/customers/${r._id}`); load(); } }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
