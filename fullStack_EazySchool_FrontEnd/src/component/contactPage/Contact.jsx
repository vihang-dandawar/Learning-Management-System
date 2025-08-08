import React, { useState } from 'react';
import { sendMessage } from '../../services/Userservice';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNum: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, mobileNum, subject, message } = formData;
    if (!name || !email || !mobileNum || !subject || !message) {
      alert("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email.");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNum)) {
      alert("Enter a 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await sendMessage(formData);
      console.log('Message sent successfully:', response.data);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-400">We’d love to hear from you</p>
      </section>

      {/* Contact Form & Info */}
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobileNum"
                value={formData.mobileNum}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-300 space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-white mb-1">Call Us</h4>
              <p><a href="tel:+1(21) 673 4587" className="hover:underline">+1 (21) 673 4587</a></p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-1">Email Us</h4>
              <p><a href="mailto:info@vikkischool.com" className="hover:underline">info@vikkischool.com</a></p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-1">Customer Support</h4>
              <p><a href="mailto:support@vikkischool.com" className="hover:underline">support@vikkischool.com</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-80">
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160999663!2d72.74110059312403!3d19.082197839124658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a1c86b7bb%3A0xe4ba9f70c34b2d5a!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1624613277313!5m2!1sen!2sin"
  className="w-full h-full border-0"
  allowFullScreen=""
  loading="lazy"
  title="Location Map"
/>

      </div>
    </div>
  );
};

export default Contact;
