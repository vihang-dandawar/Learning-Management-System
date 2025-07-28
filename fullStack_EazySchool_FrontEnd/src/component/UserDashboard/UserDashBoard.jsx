import React from 'react';

function UserDashboard() {
  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">Welcome to Your Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">My Courses</h5>
              <p className="card-text">View and manage the courses you're enrolled in.</p>
              <a href="/courses" className="btn btn-primary">View Courses</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Contact Support</h5>
              <p className="card-text">Need help? Reach out to our support team directly.</p>
              <a href="/contact" className="btn btn-outline-secondary">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Edit Profile</h5>
              <p className="card-text">Update your personal details and login credentials.</p>
              <a href="#" className="btn btn-outline-primary">Edit Profile</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Logout</h5>
              <p className="card-text">Sign out of your account securely.</p>
              <a href="/login" className="btn btn-danger">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
