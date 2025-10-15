import React from 'react';
import './App.css';
import { PatientProvider } from './context/PatientContext';
import Header from './components/Header';
import Home from './pages/Home';
import Patients from './pages/Patients';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <PatientProvider>
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </main>
        <footer className="text-center py-3 border-top">
          <small>© {new Date().getFullYear()} Jarurat Care</small>
        </footer>
      </div>
    </PatientProvider>
  );
}

export default App;
