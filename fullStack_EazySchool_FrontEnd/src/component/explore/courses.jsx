import React, { useEffect, useState } from 'react';
import { GetAllCourses } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';

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

  if (loading)
    return (
      <div className="text-center text-white mt-10 text-lg font-medium">
        Loading courses...
      </div>
    );

  return (
    <div className="bg-[#0f172a] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">📚 Available Courses</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 flex flex-col"
            style={{ height: '400px', maxWidth: '340px', margin: '0 auto' }} // 🟡 Reduced size
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h5 className="text-lg font-semibold mb-1">{course.title}</h5>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">{course.description}</p>
              <p className="text-sm text-gray-400 mb-1">
                <span className="font-medium text-gray-300">Instructor:</span> {course.instructor}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                <span className="font-medium text-gray-300">Category:</span> {course.category}
              </p>

              {/* ⬇️ Push to bottom */}
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-700">
                <span className="text-indigo-400 font-semibold text-sm">₹{course.price}</span>
                <button
                  className="bg-[#4c1d95] hover:bg-[#3b0764] text-white text-xs px-3 py-1 rounded-full transition duration-200"
                  onClick={() => handleViewCourse(course.id)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No courses found.</p>
      )}
    </div>
  );
}

export default Courses;
