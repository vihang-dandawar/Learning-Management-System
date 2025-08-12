import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetInstructorCourses } from '../../services/Userservice';

function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await GetInstructorCourses();
        setCourses(res.data);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center text-gray-300 py-10">Loading courses...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (courses.length === 0) return <div className="text-center text-gray-400 py-10">No courses created yet.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Courses</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <img
              src={course.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}
              alt={course.title}
              className="rounded-md mb-3 w-full h-44 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1 truncate">{course.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorCourses;
