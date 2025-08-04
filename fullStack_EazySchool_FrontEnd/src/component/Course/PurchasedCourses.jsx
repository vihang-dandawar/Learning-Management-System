import React, { useEffect, useState } from 'react';
import { getPurchasedCourses } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';
import './PurchasedCourses.css'; // Optional for styling

function PurchasedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getPurchasedCourses();
        const data = response.data.map(item => item.course); // extract course from each purchased object
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch purchased courses:', err);
        setError('Unable to load your courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;
  if (courses.length === 0) return <div className="text-center mt-5">You haven’t purchased any courses yet.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🎓 My Purchased Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description.substring(0, 80)}...</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  Go to Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedCourses;
