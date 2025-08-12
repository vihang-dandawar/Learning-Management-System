import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategoriesOfCourses } from '../../services/Userservice';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header({ isAuthenticated, role, username = '', onLogout }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesOfCourses();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/courses/search/${searchTerm}`);
  };

const handleDashboardNavigation = () => {
  if (isAuthenticated) {
    if (role === "ADMIN") {
      navigate("/adminDashboard");
    } else if (role === "INSTRUCTOR") {
      navigate("/instructor-dashboard");
    } else {
      navigate("/userDashboard");
    }
  } else {
    navigate("/login");
  }
};

  const Logoname = role === "ADMIN" ? "VikkiSchool Admin" : "VikkiSchool";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] bg-opacity-95 backdrop-blur-md shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left: Logo + Explore */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition">
            🎓 {Logoname}
          </Link>

          <div
            className="relative hidden md:block"
            onMouseEnter={() => {
              fetchCategories();
              setShowCategories(true);
            }}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="text-gray-300 hover:text-purple-400 font-medium transition">
              Explore
            </button>
            {showCategories && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-gray-900 text-gray-200 shadow-lg rounded-lg p-2 z-50 border border-gray-700">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-800 hover:text-purple-300 cursor-pointer rounded-md text-sm"
                    onClick={() => {
                      navigate(`/courses/category/${cat}`);
                      setShowCategories(false);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search */}
        <form
          onSubmit={handleSearch}
          className="flex-grow max-w-md mx-4 hidden sm:block"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link to="/courses" className="hover:text-purple-400 transition">Courses</Link>
          <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>

          {isAuthenticated && role === "USER" && (
            <button
              onClick={() => navigate("/become-instructor")}
              className="border border-purple-600 text-purple-300 px-4 py-1.5 rounded-full hover:bg-purple-600 hover:text-white transition"
            >
              Become Instructor
            </button>
          )}

          <button
            onClick={handleDashboardNavigation}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full transition"
          >
            Dashboard
          </button>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="ml-2 border border-purple-600 text-purple-300 px-4 py-1.5 rounded-full hover:bg-purple-600 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="ml-2 text-red-400 hover:text-red-500 transition"
              >
                Logout
              </button>
              <div
                className="ml-4 w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-full text-sm font-bold shadow-inner"
                title={username}
              >
                {getInitials(username)}
              </div>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm bg-[#0f0f0f] text-gray-300 border-t border-gray-800">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </form>

          <Link to="/courses" className="block hover:text-purple-400" onClick={() => setIsMenuOpen(false)}>Courses</Link>
          <Link to="/contact" className="block hover:text-purple-400" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          <div
            onClick={() => {
              fetchCategories();
              setShowCategories(!showCategories);
            }}
            className="cursor-pointer hover:text-purple-400"
          >
            Explore ▼
          </div>
          {showCategories && (
            <div className="pl-4">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="py-1 cursor-pointer hover:text-purple-300"
                  onClick={() => {
                    navigate(`/courses/category/${cat}`);
                    setShowCategories(false);
                    setIsMenuOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}

          {isAuthenticated && role === "USER" && (
            <button
              onClick={() => {
                navigate("/become-instructor");
                setIsMenuOpen(false);
              }}
              className="w-full border border-purple-600 text-purple-300 px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition"
            >
              Become Instructor
            </button>
          )}

          <button
            onClick={() => {
              handleDashboardNavigation();
              setIsMenuOpen(false);
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
          >
            Dashboard
          </button>

          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block text-purple-300 border border-purple-600 text-center px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
