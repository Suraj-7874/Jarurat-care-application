import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';

function AddPatientForm() {
  const { addPatient } = usePatients();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addPatient({ name: name.trim(), age: Number(age) || 0, contact, email });
    if (window.bootstrap && window.bootstrap.Toast) {
      const toastEl = document.querySelector('.toast-container .toast');
      if (toastEl) {
        const toast = new window.bootstrap.Toast(toastEl, { delay: 2500 });
        toast.show();
      }
    }
    setName('');
    setAge('');
    setContact('');
    setEmail('');
  };

  return (
    <form onSubmit={onSubmit} className="row g-3 mb-4">
      <div className="col-12 col-md-3">
        <input className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="col-6 col-md-2">
        <input className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="col-6 col-md-3">
        <input className="form-control" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
      </div>
      <div className="col-12 col-md-3">
        <input className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="col-12 col-md-1 d-grid">
        <button className="btn btn-success" type="submit">Add</button>
      </div>
    </form>
  );
}

export default AddPatientForm;


