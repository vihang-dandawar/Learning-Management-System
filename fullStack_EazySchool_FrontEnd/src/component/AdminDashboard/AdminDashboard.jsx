import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages, 
  InstructorApprovalPending,InstructorApprovalStatusApprove,
  InstructorApprovalStatusReject
} from '../../services/Userservice/';


function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [showMessages, setShowMessages] = useState(false);

  const [applications, setApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);

  const navigate = useNavigate();

  // Fetch contact messages
  const fetchMessages = async () => {
    if (showMessages) {
      setShowMessages(false);
      return;
    }

    try {
      const response = await getMessages();
      setMessages(response.data);
      setShowMessages(true);
    } catch (err) {
      setError('❌ Failed to fetch messages. You might not be authorized.');
      // console.error(err);
    }
  };

  // Fetch pending instructor applications
  const fetchApplications = async () => {
    if (showApplications) {
      setShowApplications(false);
      return;
    }

    try {
      const response = await InstructorApprovalPending();
      setApplications(response.data);
      setShowApplications(true);
    } catch (err) {
      setError('❌ Failed to fetch applications.');
      // console.error(err);
    }
  };

  // Approve application
  const approveApplication = async (id) => {
    try {
      await InstructorApprovalStatusApprove(id);
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      // console.error(err);
    }
  };

  // Reject application
  const rejectApplication = async (id) => {
    try {
      await InstructorApprovalStatusReject(id);
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 py-10 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2">🎓 Admin Dashboard</h2>
          <p className="text-lg">Manage your platform with full control.</p>
          <div className="text-sm mt-3 flex gap-2 text-gray-300">
            <a href="/" className="underline hover:text-white">Home</a>
            <span>/</span>
            <span>Dashboard</span>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="py-10 bg-[#0f172a] min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-8">Welcome Admin 👋</h3>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button
              className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={() => navigate('/')}
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Home
            </button>
            
            <button
              className="bg-green-700 hover:bg-green-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={() => navigate('/admin-getAllcourses')}
            >
              <i className="fas fa-book mr-2"></i> Show All Courses
            </button>
            <button
              className="bg-purple-700 hover:bg-purple-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={fetchMessages}
            >
              <i className="fas fa-envelope mr-2"></i>
              {showMessages ? 'Hide Contact Messages' : 'View Contact Messages'}
            </button>
            <button
              className="bg-yellow-700 hover:bg-yellow-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={fetchApplications}
            >
              <i className="fas fa-user-check mr-2"></i>
              {showApplications ? 'Hide Instructor Applications' : 'View Instructor Applications'}
            </button>
          </div>

          {error && (
            <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">{error}</div>
          )}

          {/* Contact Messages Table */}
          {showMessages && (
            <div className="overflow-x-auto bg-[#1e293b] p-6 rounded-lg border border-gray-700 mb-8">
              {messages.length === 0 ? (
                <div className="text-yellow-400 text-center font-medium">No contact messages found.</div>
              ) : (
                <table className="w-full text-white text-sm rounded overflow-hidden">
                  <thead className="bg-[#334155] text-gray-300">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Mobile</th>
                      <th className="p-3 text-left">Subject</th>
                      <th className="p-3 text-left">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, index) => (
                      <tr key={index} className="hover:bg-[#2d3748] border-b border-gray-600">
                        <td className="p-3">{msg.name}</td>
                        <td className="p-3">{msg.email}</td>
                        <td className="p-3">{msg.mobileNum}</td>
                        <td className="p-3">{msg.subject}</td>
                        <td className="p-3">{msg.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Instructor Applications Table */}
          {showApplications && (
            <div className="overflow-x-auto bg-[#1e293b] p-6 rounded-lg border border-gray-700">
              {applications.length === 0 ? (
                <div className="text-yellow-400 text-center font-medium">No pending instructor applications.</div>
              ) : (
                <table className="w-full text-white text-sm rounded overflow-hidden">
                  <thead className="bg-[#334155] text-gray-300">
                    <tr>
                      <th className="p-3 text-left">Full Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Expertise Area</th>
                      <th className="p-3 text-left">Bio</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#2d3748] border-b border-gray-600">
                        <td className="p-3">{app.authRequest.fullName}</td>
                        <td className="p-3">{app.authRequest.email}</td>
                        <td className="p-3">{app.expertiseArea}</td>
                        <td className="p-3">{app.bio}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                            onClick={() => approveApplication(app.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                            onClick={() => rejectApplication(app.id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
