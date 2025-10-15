import React from 'react';

function Home() {
  return (
    <div>
      <header className="text-center py-4">
        <h1 className="home-title mb-2">Welcome to Jarurat Care</h1>
        <p className="home-subtitle text-muted">Manage patient records efficiently and effortlessly.</p>
      </header>

      <div id="homeCarousel" className="carousel slide mb-4 home-carousel" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner rounded shadow-sm">
          <div className="carousel-item active">
            <img src="/img/hospital-1802679_1920.jpg" className="d-block w-100" alt="Hospital lobby" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="caption-fade">Compassionate Care</h5>
              <p className="caption-slide">Your health is our priority.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/medical-equipment-4099429_1920.jpg" className="d-block w-100" alt="Medical equipment" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="caption-fade">Advanced Facilities</h5>
              <p className="caption-slide">State-of-the-art diagnostics.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/laboratory-563423_1920.jpg" className="d-block w-100" alt="Laboratory" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="caption-fade">Trusted Experts</h5>
              <p className="caption-slide">Experienced specialists at your service.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="text-center">
        <h2 className="mt-4 animate-wave">Your partner in better health</h2>
        <p className="text-muted animate-rise">Book appointments, view records, and manage patient data seamlessly.</p>
      </section>
    </div>
  );
}

export default Home;


