import React, { useEffect, useRef, useState } from 'react';
import { usePatients } from '../context/PatientContext';
import PatientCard from '../components/PatientCard';
import PatientDetailsModal from '../components/PatientDetailsModal';
import AddPatientForm from '../components/AddPatientForm';

function Patients() {
  const {
    filteredPatients,
    setSearchQuery,
    searchQuery,
    selectedPatient,
    setSelectedPatient,
    isLoading,
    error,
    isAdmin,
    updatePatient,
  } = usePatients();
  const [showAddForm, setShowAddForm] = useState(false);
  const toastRef = useRef(null);
  const editModalRef = useRef(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', age: '', contact: '', email: '' });

  useEffect(() => {
    if (!toastRef.current) return;
    if (window.bootstrap && window.bootstrap.Toast) {
      const toastEl = toastRef.current;
      const toast = new window.bootstrap.Toast(toastEl, { delay: 2500 });
    }
  }, []);

  useEffect(() => {
    if (!editModalRef.current) return;
    if (window.bootstrap && window.bootstrap.Modal && editingPatient) {
      const modalEl = editModalRef.current;
      const instance = new window.bootstrap.Modal(modalEl);
      instance.show();
      const handler = () => setEditingPatient(null);
      modalEl.addEventListener('hidden.bs.modal', handler);
      return () => {
        modalEl.removeEventListener('hidden.bs.modal', handler);
        instance.hide();
      };
    }
  }, [editingPatient]);

  const openEdit = (patient) => {
    setEditingPatient(patient);
    setEditForm({
      name: patient.name || '',
      age: String(patient.age ?? ''),
      contact: patient.contact || '',
      email: patient.email || '',
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    if (!editingPatient) return;
    const updated = {
      ...editingPatient,
      name: editForm.name.trim() || editingPatient.name,
      age: Number(editForm.age) || 0,
      contact: editForm.contact,
      email: editForm.email,
    };
    updatePatient(updated);
    if (editModalRef.current && window.bootstrap && window.bootstrap.Modal) {
      const instance = window.bootstrap.Modal.getInstance(editModalRef.current);
      if (instance) instance.hide();
    }
    setEditingPatient(null);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Patients</h2>
        {isAdmin && (
          <button className="btn btn-outline-secondary" onClick={() => setShowAddForm((v) => !v)}>
            {showAddForm ? 'Hide Form' : 'Add New Patient'}
          </button>
        )}
      </div>

      {isAdmin && showAddForm && <AddPatientForm />}

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="row g-3">
          {filteredPatients.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
              <PatientCard patient={p} onView={setSelectedPatient} onEdit={openEdit} />
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <div className="col-12">
              <div className="text-center text-muted py-4">No patients found.</div>
            </div>
          )}
        </div>
      )}

      <PatientDetailsModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />

      <div className="modal fade" tabIndex="-1" ref={editModalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Patient</h5>
              <button type="button" className="btn-close" onClick={() => setEditingPatient(null)}></button>
            </div>
            <form onSubmit={submitEdit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input className="form-control" value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact</label>
                  <input className="form-control" value={editForm.contact} onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })} />
                </div>
                <div className="mb-0">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingPatient(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="toast-container">
        <div ref={toastRef} className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              New patient added successfully
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;


