import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Homepage.css';
import { latestCourses } from '../../services/Userservice';

function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [courseIndex, setCourseIndex] = useState(0);

  useEffect(() => {
    latestCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching latest courses:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCourseIndex((prev) => (prev + 1) % courses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [courses]);

  const handlePrevCourse = () => {
    setCourseIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const handleNextCourse = () => {
    setCourseIndex((prev) => (prev + 1) % courses.length);
  };

  return (
    <>
      <section
        className="latest-courses-section py-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/styles/bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff'
        }}>
        <div className="container">
          <h3 className="text-center mb-4 display-5 fw-bold">Latest Courses</h3>
          {courses.length > 0 && (
            <div className="position-relative">
              <div className="d-flex justify-content-center">
                <div className="card glass-card border-0 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                  <img
                    src={courses[courseIndex].imageUrl}
                    className="card-img-top rounded-top"
                    alt={courses[courseIndex].title}
                    style={{ height: '260px', objectFit: 'cover' }}
                  />
                  <div className="card-body bg-dark bg-opacity-50 text-white">
                    <h5 className="card-title fw-semibold">{courses[courseIndex].title}</h5>
                    <p className="card-text text-light small">
                      {courses[courseIndex].description.slice(0, 100)}...
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {courses[courseIndex].category}
                    </p>
                    <a href={`/courses/${courses[courseIndex].id}`} className="btn btn-outline-light btn-sm mt-2">
                      View Course
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePrevCourse}
                className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle shadow"
                style={{ zIndex: 2 }}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={handleNextCourse}
                className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle shadow"
                style={{ zIndex: 2 }}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        className="services-w3l-block py-5 position-relative text-white"
        id="features"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/styles/bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="container py-md-5 py-4 position-relative">
          <div className="text-center mb-5">
            <p className="text-uppercase text-info">Best Features</p>
            <h3 className="fw-bold display-6 text-white">Achieve Your Goals With Eazy School</h3>
          </div>

          <div className="row g-4">
            {[{
              icon: 'fas fa-user-friends',
              title: 'Expert Teachers',
              desc: 'Well experienced teachers for each subject. No common teacher for all subjects.'
            }, {
              icon: 'fas fa-book-reader',
              title: 'Quality Education',
              desc: 'Best curriculum based on the Cambridge international framework.'
            }, {
              icon: 'fas fa-user-graduate',
              title: 'Alumni Support',
              desc: 'Lifetime Alumni support through various channels available.'
            }, {
              icon: 'fas fa-university',
              title: 'Best Scholarships',
              desc: 'Best Scholarships available for low-income family students.'
            }].map((feature, i) => (
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch" key={i}>
                <div className="card bg-transparent border-0 text-center h-100 shadow glass-card">
                  <div className="card-body">
                    <div className="mb-3 fs-2"><i className={`${feature.icon} text-warning`}></i></div>
                    <h5 className="fw-bold text-white">{feature.title}</h5>
                    <p className="text-light small">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="highlights-premium py-5 text-white" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/styles/bg1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container text-center">
          <h3 className="display-6 fw-bold">Why Choose LearnPro</h3>
          <div className="row mt-4">
            {[['fas fa-chalkboard-teacher', 'Top Instructors'], ['fas fa-certificate', 'Industry Certifications'], ['fas fa-thumbs-up', 'Student Satisfaction'], ['fas fa-wallet', 'Guaranteed Value']].map(([icon, title], i) => (
              <div key={i} className="col-md-3 mb-3">
                <div className="fs-1"><i className={`${icon} text-info`}></i></div>
                <h5 className="mt-3 text-white">{title}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-premium py-5 text-white" id="stats" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/styles/bg1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container text-center">
          <h3 className="display-6 fw-bold">Our Numbers Speak</h3>
          <div className="row mt-4">
            {[['👩‍🎓', '1.5M+', 'Students Enrolled'], ['🎓', '5K+', 'Expert Instructors'], ['📝', '10K+', 'Courses Available'], ['🏆', '500+', 'Industry Partners']].map(([emoji, num, label], i) => (
              <div key={i} className="col-md-3">
                <div className="fs-2 fw-bold">{emoji} {num}</div>
                <p className="text-light small">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;