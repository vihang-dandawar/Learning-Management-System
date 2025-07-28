import React, { useState } from 'react';
import { CreateCourse } from '../../services/Userservice';
import './CourseForm.css';
import { useNavigate } from 'react-router-dom'; // ✅ import

const CourseForm = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructor: '',
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
      console.log(res.data);
    } catch (err) {
      console.error('❌ Error creating course', err);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card course-form-card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
        
        {/* 🔙 Back Button */}
        <div className="mb-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <h3 className="text-center mb-4 text-primary fw-bold">Create a New Course</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input name="title" onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea name="description" rows="3" onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Instructor</label>
            <input name="instructor" onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price ($)</label>
            <input name="price" type="number" onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <input name="category" onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Course Thumbnail URL</label>
            <input name="imageUrl" onChange={handleChange} className="form-control" />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary btn-lg">🚀 Create Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
