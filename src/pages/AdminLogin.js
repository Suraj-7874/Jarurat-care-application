import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';

function AdminLogin() {
  const { login } = usePatients();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (ok) {
      navigate('/patients');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-6 col-lg-5">
        <div className="card shadow-sm p-4">
          <h3 className="mb-3 text-center">Admin Login</h3>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-12">
              <label className="form-label">Username</label>
              <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="col-12">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-12 d-grid">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;


