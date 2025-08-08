import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard({ username }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Welcome to Your Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h5 className="text-xl font-semibold mb-2">My Courses</h5>
            <p className="text-gray-300 mb-4">
              View and manage the courses you're enrolled in.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => navigate('/my-courses')}
            >
              My Courses
            </button>
          </div>

          {/* Add more cards below in same style */}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
