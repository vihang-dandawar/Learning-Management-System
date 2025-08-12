import React, { useState } from 'react';
import { CreateCourse } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';

const CourseForm = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructorName: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CreateCourse(course);
      alert('✅ Course created successfully!');
      // console.log(res.data);
    } catch (err) {
      console.error('❌ Error creating course');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8">
      <div className="bg-gray-950 text-white shadow-xl rounded-lg p-8 w-full max-w-xl">
        
        {/* 🔙 Back Button */}
        <div className="mb-4">
          <button
            className="text-sm text-gray-400 hover:text-gray-200 transition"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Create a New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              name="title"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Instructor</label>
            <input
              name="instructorName"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
            <input
              name="price"
              type="number"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <input
              name="category"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Course Thumbnail URL</label>
            <input
              name="imageUrl"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded shadow-lg"
          >
            🚀 Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
