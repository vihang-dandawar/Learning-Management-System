import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterNewUser } from '../../services/Userservice';

function Register({ setIsAuthenticated, setUserRole }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    password: '',
    roles: 'USER',
  });

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RegisterNewUser(formData);
      setMsg('✅ Registration successful!');
      setIsAuthenticated(true);
      setUserRole('USER');

      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('role', 'USER');
      sessionStorage.setItem('username', formData.email);
      sessionStorage.setItem('password', formData.password);

      navigate('/userDashboard');
    } catch (err) {
      setMsg('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {msg && (
          <div className={`mb-4 text-sm font-medium p-3 rounded ${msg.includes("success") ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
