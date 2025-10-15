import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';

function Header() {
  const { isAdmin, logout } = usePatients();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
       
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <img src="/logo.png" alt="logo" style={{ height: 40, borderRadius: 10 }} className="me-2" />
          Jarurat Care
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/patients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Patients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            {!isAdmin && (
              <li className="nav-item">
                <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Admin
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <button className="btn btn-sm btn-light ms-2" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;


