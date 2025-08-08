import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateCredentials } from '../../services/Userservice';

function LoginPage({ setIsAuthenticated, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await validateCredentials({ email, password });

      if (response.status === 200) {
        const { token, role, userId } = response.data;
        const cleanRole = role.replace('ROLE_', '');

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('role', cleanRole);
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('userId', userId);

        setIsAuthenticated(true);
        setUserRole(cleanRole);

        if (cleanRole === 'ADMIN') {
          navigate('/adminDashboard');
        } else {
          navigate('/userDashboard');
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Log In</h2>
        <p className="text-gray-300">Access your account</p>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {errorMsg && (
          <div className="mb-4 bg-red-500 text-white p-3 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 rounded"
          >
            Log In
          </button>

          {/* New User + Forget Password */}
          <div className="flex justify-between items-center text-sm text-gray-300">
            <a href="/register" className="hover:underline">
              New User?
            </a>
            <button
              type="button"
              className="text-blue-400 hover:text-blue-500"
              onClick={() => navigate('/forget-password')}
            >
              Forget Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
