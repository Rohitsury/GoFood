import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const apiUrl = 'https://gofoodbackend-8rp4.onrender.com' || 'http://localhost:5000' ;

  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const res = await fetch(`${apiUrl}/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send only 'email' in the request body
      });

      const data = await res.json()
      console.log(data.user._id)
      if(res.status === 404)
      {
        alert(data.message)
      }
      else if(res.status  === 400)
      {
        alert(data.message)
      }
      else if(res.status  === 500)
      {
        alert(data.message)
      }
      else{
        setUserId(data.user._id)
        setOtpSent(true);
        setMessage('Verification OTP has been sent to your email.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again later.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await fetch(`${apiUrl}/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, email, otp, newPassword }),
      });

      const data = await res.json()
      if(res.status === 404)
      {
        alert(data.message)
      }
      else if(res.status  === 400)
      {
        alert(data.message)
      }
      else if(res.status  === 401)
      {
        alert(data.message)
      }

      else if(res.status  === 500)
      {
        alert(data.message)
      }
      setMessage('Password reset successful. Please log in with your new password.');
      setOtpSent(false);
      navigate('/login')
    } catch (error) {
      setMessage('Invalid OTP. Please check the code and try again.');
    }
  };

  return (
    <>
      <h2>Forgot Password</h2>
      {otpSent ? (
        <>
          <input type="text" placeholder="Verification OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handleVerifyOTP}>Verify OTP and Reset Password</button>
        </>
      ) : (
        <>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleSendOTP}>Send OTP</button>
        </>
      )}
      <p>{message}</p>
    </>
  );
}

export default ForgotPassword;
