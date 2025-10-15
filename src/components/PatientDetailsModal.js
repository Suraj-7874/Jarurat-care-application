import React, { useEffect, useRef } from 'react';

function PatientDetailsModal({ patient, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;
    const modalElement = modalRef.current;
  
    if (window.bootstrap && window.bootstrap.Modal) {
      const instance = new window.bootstrap.Modal(modalElement);
      instance.show();
      const handler = () => onClose();
      modalElement.addEventListener('hidden.bs.modal', handler);
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handler);
        instance.hide();
      };
    }
  }, [onClose]);

  if (!patient) return null;

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{patient.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Contact:</strong> {patient.contact}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Address:</strong> {patient.address}</p>
            {patient.company && <p><strong>Company:</strong> {patient.company}</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsModal;


