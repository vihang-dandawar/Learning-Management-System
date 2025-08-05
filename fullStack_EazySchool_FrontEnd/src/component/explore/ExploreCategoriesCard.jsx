import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoursesByCategory = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:1011/courses/category/${category}`);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  const navigate=useNavigate();

  if (loading) return <div className="text-center mt-5">Loading courses...</div>;
  if (error) return <div className="text-danger mt-5 text-center">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Courses under <strong>{category}</strong></h3>
      {courses.length === 0 ? (
        <p>No courses found in this category.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-3" key={course.id}>
              <div className="card h-100">
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
  <h5 className="card-title">{course.title}</h5>
  <p className="card-text">{course.description}</p>
  <p className="card-text mb-1"><strong>Instructor:</strong> {course.instructorName}</p>
 <div className="mt-auto d-flex justify-content-between align-items-center">
  <span className="text-success fw-bold mb-0">
    ₹{course.price}
  </span>
  <button
    className="btn btn-outline-primary btn-sm"
    onClick={() =>navigate(`/courses/${course.id}`)}
  >
    View Course
  </button>
</div>

</div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesByCategory;
