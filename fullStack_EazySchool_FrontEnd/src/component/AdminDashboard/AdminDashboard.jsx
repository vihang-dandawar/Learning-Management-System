import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../../services/Userservice';

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    if (showMessages) {
      setShowMessages(false);
      return;
    }

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

  const changeMsgStatus = (id) => {
    console.log('Change message status for ID:', id);
    // Future implementation
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
              className="bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={() => navigate('/create-course')}
            >
              <i className="fas fa-plus-circle mr-2"></i> Create New Course
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
          </div>

          {error && (
            <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">{error}</div>
          )}

          {/* Messages Table */}
          {showMessages && (
            <div className="overflow-x-auto bg-[#1e293b] p-6 rounded-lg border border-gray-700">
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
                      <tr
                        key={index}
                        className="hover:bg-[#2d3748] border-b border-gray-600"
                      >
                        <td className="p-3">{msg.name}</td>
                        <td className="p-3">{msg.email}</td>
                        <td className="p-3">{msg.mobileNum}</td>
                        <td className="p-3">{msg.subject}</td>
                        <td className="p-3">{msg.message}</td>
                        <td className="p-3">
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="text-center mt-4">
                <button
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm shadow transition"
                  onClick={() => setShowMessages(false)}
                >
                  <i className="fas fa-times mr-2"></i>Close Messages
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
