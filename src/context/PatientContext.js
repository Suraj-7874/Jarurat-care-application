import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const PatientContext = createContext(null);

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('jc_is_admin') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    let isCancelled = false;
    async function fetchPatients() {
      setIsLoading(true);
      setError(null);
      try {
      
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const users = await response.json();
        const mapped = users.map((u) => ({
          id: u.id,
          name: u.name,
          age: 20 + (u.id % 50),
          contact: u.phone,
          email: u.email,
          address: `${u.address.suite}, ${u.address.street}, ${u.address.city}`,
          company: u.company?.name || '',
        }));
        if (!isCancelled) {
          setPatients(mapped);
        }
      } catch (e) {
        if (!isCancelled) setError(e.message || 'Unknown error');
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }
    fetchPatients();
    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredPatients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) => p.name.toLowerCase().includes(q));
  }, [patients, searchQuery]);

  const addPatient = (patient) => {
    const nextId = patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
    const newPatient = { id: nextId, ...patient };
    setPatients((prev) => [newPatient, ...prev]);
  };

  const updatePatient = (updated) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
  };

  const removePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const login = (username, password) => {
    const ok = username === 'suraj' && password === 'suraj123';
    if (ok) {
      setIsAdmin(true);
      try { localStorage.setItem('jc_is_admin', '1'); } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try { localStorage.removeItem('jc_is_admin'); } catch {}
  };

  const value = {
    patients,
    filteredPatients,
    searchQuery,
    setSearchQuery,
    selectedPatient,
    setSelectedPatient,
    isLoading,
    error,
    addPatient,
    updatePatient,
    removePatient,
    isAdmin,
    login,
    logout,
  };

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
}

export function usePatients() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatients must be used within PatientProvider');
  return ctx;
}


