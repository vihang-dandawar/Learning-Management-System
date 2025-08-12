import React, { useEffect, useState } from 'react';
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
      setError('❌ Failed to load courses. Please try again.');
      // console.error(err);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">📚 Explore Our Premium Courses</h2>

      {error && <div className="bg-red-500 text-white text-center py-2 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2 mb-3">{course.description}</p>
              <p className="text-sm mb-1"><span className="font-semibold">Instructor:</span> {course.instructorName}</p>
              <p className="text-sm mb-3"><span className="font-semibold">Category:</span> {course.category}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-green-400 font-semibold text-lg">₹{course.price}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition"
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
        <p className="text-center text-gray-400 mt-8">No courses available.</p>
      )}
    </div>
  );
}

export default CourseList;
