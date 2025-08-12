import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoursesByCategory = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/category/${category}`);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:");
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  if (loading) return <div className="text-center text-white mt-10">Loading courses...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Courses under <span className="text-indigo-400">{category}</span>
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-300">No courses found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
            >
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-300 mb-2 line-clamp-3">{course.description}</p>
                <p className="text-sm mb-1">
                  <span className="text-gray-400">Instructor:</span> {course.instructorName}
                </p>
                <div className="mt-auto flex justify-between items-center pt-3">
                  <span className="text-green-400 font-semibold text-sm">₹{course.price}</span>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-md"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Course
                  </button>
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
