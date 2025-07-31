import React, { useEffect, useState } from 'react';
import { GetAllCourses } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';
import './courses.css'; // Reuse the same CSS

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllCourses()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load courses', err);
        setLoading(false);
      });
  }, []);

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) return <div className="text-center mt-5">Loading courses...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">📚 Available Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card course-card shadow-sm rounded-4 border-0">
              <img
                src={course.imageUrl}
                className="card-img-top rounded-top-4"
                alt={course.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{course.title}</h5>
                <p className="card-text text-muted description">{course.description}</p>
                <p className="mb-1"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="mb-2"><strong>Category:</strong> {course.category}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="badge bg-success fs-6">₹{course.price}</span>
                  <button
                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                    onClick={() => handleViewCourse(course.id)}
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {courses.length === 0 && (
        <p className="text-center text-muted">No courses found.</p>
      )}
    </div>
  );
}

export default Courses;
