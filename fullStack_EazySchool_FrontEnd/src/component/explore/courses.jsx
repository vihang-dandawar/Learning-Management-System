import React, { useEffect, useState } from 'react';
import { GetAllCourses } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';

function courses() {
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
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">📚 Available Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`${course.imageUrl}`} // Or any valid image path
                className="card-img-top"
                alt={course.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewCourse(course.id)}
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default courses;
