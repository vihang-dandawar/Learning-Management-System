import React, { useEffect, useState } from 'react';
import { getPurchasedCourses } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';

function PurchasedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getPurchasedCourses();
        const data = response.data.map(item => item.course);
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

  if (loading) return <div className="text-center text-white mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (courses.length === 0) return <div className="text-center text-gray-300 mt-10">You haven’t purchased any courses yet.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">🎓 My Purchased Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h5 className="text-xl font-bold mb-1">{course.title}</h5>
              <p className="text-sm text-gray-300 mb-2">
                {course.description.substring(0, 80)}...
              </p>
              <p className="text-sm mb-1">
                <span className="text-gray-400">Instructor:</span> {course.instructor}
              </p>
              <p className="text-sm mb-1">
                <span className="text-gray-400">Category:</span> {course.category}
              </p>
              <p className="text-sm mb-4">
                <span className="text-gray-400">Price:</span> ₹{course.price}
              </p>
              <div className="mt-auto">
                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
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
