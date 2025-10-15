import React from 'react';
import { usePatients } from '../context/PatientContext';

function PatientCard({ patient, onView, onEdit }) {
  const { isAdmin, removePatient } = usePatients();
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-1">{patient.name}</h5>
        <p className="text-muted mb-2">Age: {patient.age}</p>
        <p className="mb-3"><span className="fw-semibold">Contact:</span> {patient.contact}</p>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => onView(patient)}>View Details</button>
          {isAdmin && (
            <>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => onEdit(patient)}>Edit</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => removePatient(patient.id)}>Remove</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientCard;


