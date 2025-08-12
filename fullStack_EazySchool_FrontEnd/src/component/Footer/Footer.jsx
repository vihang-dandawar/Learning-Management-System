// FooterComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate=useNavigate();
  return (
    <footer className="bg-[#0f0f0f] bg-opacity-95 text-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Contact</h2>
          <p className="text-sm mb-2">
            Phone: <a href="tel:+918767847085" className="hover:text-white transition-colors">+91 87678 47085</a>
          </p>
          <p className="text-sm">
            Email: <a href="mailto:info@vikkischool.com" className="hover:text-white transition-colors">info@vikkischool.com</a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Quick Links</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
           <li><a  className="hover:text-white transition-colors"> <button onClick={()=>{navigate("/become-instructor")}}>Become a Teacher</button></a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Explore</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">License</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Subscribe</h2>
          <form className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded bg-white text-black text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </form>
          <p className="text-xs mt-3 text-gray-300">Get updates and news in your inbox.</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-12 border-t border-gray-600 pt-5">
        © 2025 Vikki School. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
