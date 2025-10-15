import React from 'react';

function About() {
  return (
    <div>
      <h2 className="mb-3 home-title">About Jarurat Care</h2>
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-6">
          <p className="text-muted animate-rise">
            At Jarurat Care Foundation, we stand beside those affected by cancer—patients,
            caregivers, and healthcare professionals—offering hope, guidance, and practical
            support. Our community-driven efforts focus on compassion and access to care.
          </p>
          <p className="text-muted animate-rise">
            We collaborate with hospitals, volunteers, and donors to ensure no one faces the
            journey alone. From nutrition and counselling to resources and coordination, our
            mission is to make care simpler, kinder, and more connected across India.
          </p>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3">
            <ul className="mb-0">
              <li>Human‑centered support and guidance</li>
              <li>Coordination with trusted providers</li>
              <li>Resources for patients and caregivers</li>
              <li>Inclusive, responsive, and secure services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;


