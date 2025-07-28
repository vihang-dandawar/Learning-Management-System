import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header({ isAuthenticated, role,username = '', onLogout }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
    console.log('Search for:', searchTerm);
    // navigate(`/search?query=${searchTerm}`);
  };
  const handleDashboardNavigation = () => {
  if (isAuthenticated) {
    console.log("authhhh")
    if (role === "ADMIN") {
      console.log("adminnnn")
      console.log(role)
      navigate("/adminDashboard");
    } else{
      
      console.log("userrr")
      console.log(role)
      navigate("/userDashboard");
    }
  } else {
    console.log("notauthhhh")
    navigate("/login");
  }
};

let Logoname;
if(role==="ADMIN")
{
  Logoname="EazySchool Admin"
}
else
  Logoname="EazySchool"

  return (
<header id="site-header" className="fixed-top clean-header">



  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light d-flex align-items-center">
      {/* Logo */}
      <Link className="navbar-brand me-3 text-white" to="/">
        <i className="fas fa-graduation-cap me-2"></i> {Logoname}
      </Link>

      {/* Explore Button */}
      <button
        className="btn btn-outline-light me-3"
        onClick={() => navigate('/explore')}
      >
        Explore
      </button>

      {/* Search Bar */}
      <form className="d-flex me-auto" onSubmit={handleSearch} style={{ flexGrow: 1, maxWidth: '400px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Navigation */}
      <div className="collapse navbar-collapse" id="navbarScroll">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/courses">Courses</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">


<button className="btn btn-outline-light" onClick={handleDashboardNavigation}>
  Dashboard
</button>
          </li>

          {!isAuthenticated ? (
            <li className="nav-item">
              <Link className="btn btn-outline-light ms-3" to="/login">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li className="nav-item ms-3">
                <div className="avatar-circle text-white bg-primary fw-bold text-center" title={username}>
                  {getInitials(username)}
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  </div>

  {/* Avatar + custom styles */}
  <style>{`
    .custom-header {
      background-color: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .navbar-nav .nav-link {
      color: white !important;
    }

    .avatar-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .form-control {
      background-color: rgba(255, 255, 255, 0.8);
    }
  `}</style>
</header>

  );
}

export default Header;
