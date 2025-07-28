import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GetAllCourses } from '../../services/Userservice';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await GetAllCourses();
      setCourses(response.data);
    } catch (err) {
      setError('❌ Failed to load courses. Please try againnnn.');
      console.error(err);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`); // You can use this to route to course details or videos
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">📚 Explore Our Premium Courses</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={course.imageUrl}
                className="card-img-top"
                alt={course.title}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text text-muted">{course.description}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleViewCourse(course.id)}
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && !error && (
        <p className="text-center text-muted">No courses available.</p>
      )}
    </div>
  );
}

export default CourseList;
