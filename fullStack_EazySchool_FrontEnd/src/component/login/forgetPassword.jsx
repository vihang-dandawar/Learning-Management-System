import React, { useState } from 'react';
import { sendOTP, resetPasswordWithOTP } from '../../services/Userservice';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOTP(email);
      setMessage('OTP sent to your email');
      setStep(2);
    } catch (error) {
      setMessage('Error sending OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordWithOTP({ email, otp, password: newPassword });
      setMessage('Password reset successfully');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
          Forgot Password
        </h2>

        {message && (
          <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {step === 1 && (
          <>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition duration-200"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm text-white mb-1 mt-4">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-sm text-white mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition duration-200"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
