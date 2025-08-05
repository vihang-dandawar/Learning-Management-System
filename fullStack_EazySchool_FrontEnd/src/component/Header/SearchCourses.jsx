import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchCourse } from '../../services/Userservice';
import './SearchCourses.css'; // <- Custom styles (create this file)

function SearchCourses() {
  const { keyword } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await searchCourse(keyword);
        setCourses(response.data);
      } catch (err) {
        setError('Something went wrong while fetching search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [keyword]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4 search-heading">
        Search results for: <span className="text-primary">"{keyword}"</span>
      </h3>

      {loading && <p className="text-center fs-5 text-muted">Loading courses...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p className="text-muted text-center">No courses found matching your search.</p>
      )}

      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card course-card h-100 shadow-lg border-0">
              <img
                src={course.imageUrl || 'https://via.placeholder.com/400x200.png?text=Course+Image'}
                className="card-img-top"
                alt={course.title}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{course.title}</h5>
                <p className="card-text description">{course.description}</p>
                <p className="card-text text-muted mb-1"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="card-text text-success"><strong>Price:</strong> ₹{course.price}</p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <a href={`/courses/${course.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-4">
                  View Course
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchCourses;
