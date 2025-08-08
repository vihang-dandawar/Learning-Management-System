import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetCourseById, updateCourse, deleteCourse } from '../../services/Userservice';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    GetCourseById(id).then((res) => setCourse(res.data));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateCourse(id, course);
      alert('✅ Course updated successfully');
      navigate(`/courses/${id}`);
    } catch (err) {
      alert('❌ Update failed');
    }
  };

  const DeleteCourse = async () => {
    try {
      await deleteCourse(id);
      alert('🗑️ Course deleted successfully');
      navigate('/admin-getAllcourses');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-800 text-white py-8 px-4">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
        <button
          className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit Course</h2>

        <input
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Title"
          value={course.title || ''}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Description"
          value={course.description || ''}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Instructor"
          value={course.instructor || ''}
          onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Category"
          value={course.category || ''}
          onChange={(e) => setCourse({ ...course, category: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Price"
          value={course.price || ''}
          onChange={(e) => setCourse({ ...course, price: e.target.value })}
        />

        <input
          className="w-full p-3 mb-6 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Thumbnail"
          value={course.imageUrl || ''}
          onChange={(e) => setCourse({ ...course, imageUrl: e.target.value })}
        />

        <div className="flex justify-between gap-4">
          <button
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md font-medium"
            onClick={handleUpdate}
          >
            ✅ Update Course
          </button>

          <button
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-md font-medium"
            onClick={DeleteCourse}
          >
            🗑️ Delete Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
