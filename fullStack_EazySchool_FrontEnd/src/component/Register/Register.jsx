import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RegisterNewUser } from '../../services/Userservice';

function Register({ setIsAuthenticated, setUserRole }) {
  const [formData, setFormData] = useState({
    // username: '',
     fullName: '',
    email: '',
    age: '',
    password: '',
    roles: 'USER',
  });

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RegisterNewUser(formData);
      console.log(formData.roles)
      setMsg('✅ Registration successful!');
      setIsAuthenticated(true);
      setUserRole('USER');

      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('role', formData.roles === 'USER');
      sessionStorage.setItem('username', formData.email);
      sessionStorage.setItem('password', formData.password);
      navigate('/userDashboard');

     
    } catch (err) {
      setMsg('❌ Registration failed. Please try again.');
    }
  };

  return (
    <section className="w3l-contact py-5">
      <div className="container py-md-5 py-4">
        <div className="title-main text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: '500px' }}>
          <h3 className="title-style">Create an Account</h3>
          {msg && <div className={`alert ${msg.includes("success") ? "alert-success" : "alert-danger"}`}>{msg}</div>}
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="signin-form p-4 border rounded bg-light shadow">
              <div className="mb-3">
                <input type="text" name="fullName" className="form-control" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
              </div>
               <div className="mb-3">
                <input type="number" name="age" className="form-control" placeholder="Age" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              {/* <div className="mb-3">
                <input type="text" name="username" className="form-control" placeholder="Username" value={formData.username} onChange={handleChange} required />
              </div> */}
              <div className="mb-3">
                <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>
             
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
