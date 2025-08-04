import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Homepage.css';
import { latestCourses } from '../../services/Userservice';

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
  const [courses,setCourses]=useState([]);

// Add at the top (inside Homepage component)
const [courseIndex, setCourseIndex] = useState(0);

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









useEffect(() => {
  latestCourses()
    .then((response) => {
      setCourses(response.data);
    })
    .catch((error) => {
      console.error('Error fetching latest courses:', error);
    });
}, []);



  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* Sliding Banner Section */}
   <section className="latest-courses py-5 bg-light" id="latest-courses" 
    style={{
          backgroundImage: 'url("/public/styles/bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}>

  <div className="container">
    <h3 className="text-center mb-4">Latest Courses</h3>
    {courses.length > 0 && (
      <div className="position-relative">
        <div className="d-flex justify-content-center">
          <div className="card shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
            <img
              src={courses[courseIndex].imageUrl}
              className="card-img-top"
              alt={courses[courseIndex].title}
              style={{ height: '260px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{courses[courseIndex].title}</h5>
              <p className="card-text text-muted">
                {courses[courseIndex].description.slice(0, 100)}...
              </p>
              <p className="card-text">
                <strong>Category:</strong> {courses[courseIndex].category}
              </p>
              <a href={`/courses/${courses[courseIndex].id}`} className="btn btn-primary btn-sm">
                View Course
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevCourse}
          className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y    btn btn-danger"
          style={{ zIndex: 2 }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={handleNextCourse}
          className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y btn btn-danger"
          style={{ zIndex: 2 }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    )}
  </div>
</section>

      {/* Features Section */}
      <section
        className="services-w3l-block py-5 position-relative text-white"
        id="features"
        style={{
          backgroundImage: 'url("/public/styles/bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div className="overlay" style={{
          // backgroundColor: 'rgba(0, 50, 80, 0.6)',
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
<section className="highlights-premium py-5"
 style={{
          backgroundImage: 'url("/public/styles/bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}>
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
<section className="stats-premium py-5" id="stats" 
 style={{
          backgroundImage: 'url("/public/styles/bg1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}>
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
