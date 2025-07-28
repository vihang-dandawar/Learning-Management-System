import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Homepage.css';

const slides = [
  {
    heading: 'Your Kids Deserve',
    subheading: 'Best Education',
    description: 'Active Learning, Expert Teachers & Safe Environment',
    buttonText: 'Admission Now',
  },
  {
    heading: 'Empower Future Leaders',
    subheading: 'Top Mentors',
    description: 'Guidance that matters from experienced educators.',
    buttonText: 'Enroll Today',
  },
  {
    heading: 'Unlock Hidden Potential',
    subheading: 'With Right Tools',
    description: 'Smart classrooms, online resources, 24/7 access.',
    buttonText: 'Get Started',
  },
];

function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* Sliding Banner Section */}
      <section id="home" className="w3l-banner py-5 position-relative overflow-hidden banner-slider">
        <button className="banner-nav-btn left" onClick={goToPrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="banner-nav-btn right" onClick={goToNext}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`banner-slide container py-4 ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="row align-items-center pt-sm-5 pt-4">
              <div className="col-md-6 banner-left">
                <h3 className="banner-heading mb-lg-4 mb-3">
                  {slide.heading}<br />
                  <span>{slide.subheading}</span>
                </h3>
                <p className="banner-sub">{slide.description}</p>
                <div className="d-flex align-items-center buttons-banner">
                  <a className="btn btn-style mt-lg-5 mt-4" href="/contact">{slide.buttonText}</a>
                </div>
              </div>
              <div className="col-md-6 text-end mt-md-0 mt-5">
                {/* Optional: Add image per slide here */}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section
        className="services-w3l-block py-5 position-relative text-white"
        id="features"
        style={{
          backgroundImage: 'url("bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div className="overlay" style={{
          backgroundColor: 'rgba(0, 50, 80, 0.6)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}></div>

        <div className="container py-md-5 py-4 position-relative" style={{ zIndex: 1 }}>
          <div className="title-main text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: '600px' }}>
            <p className="text-uppercase text-light">Best Features</p>
            <h3 className="title-style text-white">Achieve Your Goals With Eazy School</h3>
          </div>

          <div className="row g-4">
            {[
              {
                icon: 'fas fa-user-friends',
                title: 'Expert Teachers',
                desc: 'Well experienced teachers for each subject. No common teacher for all subjects.',
              },
              {
                icon: 'fas fa-book-reader',
                title: 'Quality Education',
                desc: 'Best curriculum based on the Cambridge international framework.',
              },
              {
                icon: 'fas fa-user-graduate',
                title: 'Alumni Support',
                desc: 'Life time Alumni support through various channels available.',
              },
              {
                icon: 'fas fa-university',
                title: 'Best Scholarships',
                desc: 'Best Scholarships available for low-income family students.',
              },
            ].map((feature, index) => (
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch" key={index}>
                <div className="card text-white bg-transparent border-0 shadow-lg p-3 h-100" style={{
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                }}>
                  <div className="card-body text-center">
                    <div className="icon mb-3" style={{ fontSize: '2rem' }}>
                      <i className={`${feature.icon} text-white`}></i>
                    </div>
                    <h5 className="card-title text-white">{feature.title}</h5>
                    <p className="card-text text-light">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Platform */}
{/* <section className="about-premium py-5" id="about">
  <div className="container d-flex align-items-center flex-wrap">
    <div className="about-image position-relative">
      <img src="/images/instructor-session.jpg" alt="Instructor teaching" />
      <div className="contact-box">
        <h5>Have Questions?</h5>
        <p>Call Admissions or Chat with an Expert 🎓</p>
        <a href="tel:+18008564321"><i className="fas fa-phone-alt"></i> +1‑800‑856‑4321</a>
      </div>
    </div>
    <div className="about-content">
      <h2>Accelerate Your Career with LearnPro</h2>
      <p>Join over 1M+ learners and gain skills from top instructors in our curated professional courses.</p>
      <ul>
        <li><i className="fas fa-check-circle"></i> Expert-curated course content</li>
        <li><i className="fas fa-check-circle"></i> Access 100K+ downloadable resources</li>
        <li><i className="fas fa-check-circle"></i> Offline learning on any device</li>
      </ul>
      <a href="/register" className="btn btn-cta">Start Learning</a>
    </div>
  </div>
</section> */}

{/* Platform Highlights */}
<section className="highlights-premium py-5">
  <div className="container text-center">
    <h3>Why Choose LearnPro</h3>
    <div className="row mt-4">
      {[
        ['fas fa-chalkboard-teacher', 'Top Instructors'],
        ['fas fa-certificate', 'Industry Certifications'],
        ['fas fa-thumbs-up', 'Student Satisfaction'],
        ['fas fa-wallet', 'Guaranteed Value'],
      ].map(([icon, title], i) => (
        <div key={i} className="col-md-3 highlight-item">
          <i className={icon}></i>
          <h5>{title}</h5>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Key Statistics */}
<section className="stats-premium py-5" id="stats">
  <div className="container text-center">
    <h3>Our Numbers Speak</h3>
    <div className="row mt-4">
      {[
        ['👩‍🎓', '1.5M+', 'Students Enrolled'],
        ['🎓', '5K+', 'Expert Instructors'],
        ['📝', '10K+', 'Courses Available'],
        ['🏆', '500+', 'Industry Partners'],
      ].map(([emoji, num, label], i) => (
        <div key={i} className="col-md-3 stat-item">
          <div className="stat-number">{emoji} {num}</div>
          <p className="stat-label">{label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  );
}

export default Homepage;
