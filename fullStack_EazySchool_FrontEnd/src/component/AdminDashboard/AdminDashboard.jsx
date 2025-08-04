import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../../services/Userservice';

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data);
      setShowMessages(true);
      console.log("USERNAME:", sessionStorage.getItem("username"));
      console.log("PASSWORD:", sessionStorage.getItem("password"));
    } catch (err) {
      setError('❌ Failed to fetch messages. You might not be authorized.');
      console.error(err);
    }
  };


  const changeMsgStatus =async()=>
  {
    
  }

  return (
    <>
      {/* Banner */}
      <section className="inner-banner py-5 bg-dark text-white">
        <div className="container pt-4 pb-sm-4">
          <h2 className="display-5 fw-bold">🎓 Admin Dashboard</h2>
          <p className="lead">Manage your platform with full control.</p>
          <ul className="breadcrumbs-custom-path list-unstyled d-flex gap-2 mt-2">
            <li><a href="/" className="text-light text-decoration-underline">Home</a></li>
            <li><i className="fas fa-angle-right"></i> Dashboard</li>
          </ul>
        </div>
      </section>

      {/* Dashboard Actions */}
      <section className="py-5">
        <div className="container text-center">
          <h3 className="mb-5 fw-bold">Welcome Admin 👋</h3>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">

            <button className="btn btn-outline-secondary btn-lg shadow-sm" onClick={() => navigate('/')}>
              <i className="fas fa-arrow-left me-2"></i> Back to Home
            </button>

            <button className="btn btn-outline-primary btn-lg shadow-sm" onClick={() => navigate('/create-course')}>
              <i className="fas fa-plus-circle me-2"></i> Create New Course
            </button>

            <button className="btn btn-outline-success btn-lg shadow-sm" onClick={() => navigate('/admin-getAllcourses')}>
              <i className="fas fa-book me-2"></i> Show All Courses
            </button>

            <button className="btn btn-outline-dark btn-lg shadow-sm" onClick={fetchMessages}>
              <i className="fas fa-envelope-open-text me-2"></i> View Contact Messages
            </button>

          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Messages Table */}
          {showMessages && (
            messages.length === 0 ? (
              <div className="alert alert-warning">No contact messages found.</div>
            ) : (
              <div className="table-responsive mt-4 shadow-lg rounded">
                <table className="table table-bordered table-hover table-striped bg-white">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, index) => (
                      <tr key={index}>
                        <td>{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>{msg.mobileNum}</td>
                        <td>{msg.subject}</td>
                        <td>{msg.message}</td>
                         <button onClick={()=>{changemsgStatus(msg.id)}}><td>{msg.status}</td> </button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
