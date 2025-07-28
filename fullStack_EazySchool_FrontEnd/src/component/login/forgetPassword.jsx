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
      await sendOTP(email); // 🔒 Call backend to send OTP
      setMessage('OTP sent to your email');
      setStep(2);
    } catch (error) {
      setMessage('Error sending OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
    
      await resetPasswordWithOTP({email, otp, password:newPassword});
      console.log({email, otp, password:newPassword})
      setMessage('Password reset successfully');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forget Password</h3>
      {message && <div className="alert alert-info">{message}</div>}

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="form-control mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendOtp}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            className="form-control mb-3"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            className="form-control mb-3"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgetPassword;
