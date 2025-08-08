import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchCourse } from '../../services/Userservice';

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
    <div className="min-h-screen px-4 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          Search results for: <span className="text-blue-400">"{keyword}"</span>
        </h3>

        {loading && (
          <p className="text-center text-lg text-gray-300">Loading courses...</p>
        )}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}
        {!loading && !error && courses.length === 0 && (
          <p className="text-center text-gray-400">No courses found matching your search.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#1e293b] rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={course.imageUrl || 'https://via.placeholder.com/400x200.png?text=Course+Image'}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold mb-2">{course.title}</h5>
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">{course.description}</p>
                <p className="text-sm text-gray-400 mb-1"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="text-green-400 font-semibold text-sm"><strong>Price:</strong> ₹{course.price}</p>
              </div>
              <div className="px-4 pb-4 text-center">
                <a
                  href={`/courses/${course.id}`}
                  className="inline-block mt-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-full transition duration-200"
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchCourses;
