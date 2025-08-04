import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard({ username }) {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">Welcome to Your Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">My Courses</h5>
              <p className="card-text">View and manage the courses you're enrolled in.</p>
              <button className="btn btn-primary" onClick={() => navigate('/my-courses')}>
                My Courses
              </button>
            </div>
          </div>
        </div>

        {/* Other dashboard cards (Contact Support, Edit Profile, Logout) remain unchanged */}
      </div>
    </div>
  );
}

export default UserDashboard;
