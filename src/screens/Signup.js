import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import login from '../components/Images/login.png'
import { NavLink, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';


const Register = () => {
  const apiUrl = 'https://gofoodbackend-8rp4.onrender.com' || 'http://localhost:5000' ;

  let navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [otp, setOtp] = useState('');
  const [isOTPVerificationEnabled, setIsOTPVerificationEnabled] = useState(false);

  const nameRegex = /^[A-Za-z\s]+$/;


  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!nameRegex.test(name)) {
      alert('Please enter a valid name');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, location, email, password })
      });
      const result = await res.json();
      console.log(res.status)
      if (res.status === 202) {
        setId(result.userId);
        alert('Email sent Successfully');
        setIsOTPVerificationEnabled(true);
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.log(error);

      alert('An error occurred during registration');
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/auth/verifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, otp, name, location, email, password })
      });

      const result = await res.json();
      if (res.status === 200) {
        alert('Email verified successfully!');
        navigate('/login')
      }
      else if (res.status === 400) {
        alert('code has expired please click resend again')
      }
      else if (res.status === 401) {
        alert('Provided otp is not correct')
      }
      else {
        alert("err");
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during OTP verification');
    }
  };

  const handleResentOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/auth/resendotp`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, email })
      })
      alert("Email Sent Successfuly")
      setIsOTPVerificationEnabled(true)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

 

  const Cancel = () => {
    setIsOTPVerificationEnabled(false);
  }
  return (
    <>
      <Navbar />
    <div className='login' style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover' }}>
              {
                isOTPVerificationEnabled ? (
                  <div className='login'>

                    <form onSubmit={handleOTPVerification} className='otp'>
                      <div>
                        {/* <button className='fs-1 m-2' onClick={Cancel}/>  */}
                        <h4 className='text-center pt-1' style={{ fontFamily: 'times-new-roman' }}></h4>
                      </div>
                      <p className='ms-3 mb-3 text-white text-center' style={{ fontFamily: 'times-new-roman', color: 'gray', fontStyle: 'italic', marginTop: '80px' }}>Verification OTP email sent to your entered email address </p>
                      <div className='text-center' style={{ marginTop: '30px' }}>

                        <label htmlFor="otp" className='me-3'>Enter OTP </label>
                        <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required /><br /><br />

                        <input type="submit" className='btn btn-primary' value="Verify OTP" />
                        <button className='btn btn-outline-warning ms-3' onClick={handleResentOTP}>Resend OTP</button>
                      </div>
                    </form>
                  </div>) : (

                  <div className='container logincon' data-aos="zoom-in" >
                    <form className='  m-auto loginform  border bg-dark border-success rounded' onSubmit={handleRegistration}>
                      <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={name} onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" />
                      </div>
                      <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={email} onChange={(e) => setEmail(e.target.value)}aria-describedby="emailHelp" />
                      </div>
                      <div className="m-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <fieldset>
                          <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={location} onChange={(e) => setLocation(e.target.value)} aria-describedby="emailHelp" />
                        </fieldset>
                      </div>
                      {/* <div className="m-3">
                        <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
                      </div> */}
                      <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)}  name='password' />
                      </div>
                      <button type="submit" className="m-3 btn btn-success">Submit</button>
                      <NavLink to="/login" className="m-3 mx-1 btn btn-danger">Already a user</NavLink>
                    </form>
                  </div>
                )}


            </div>
            
      <style>
        {`
            
      .loginsection-subdiv{
        height:84vh;
        width:85%; 
      }
    
      .loginsection-row{
        width:100%;
        // box-shadow:0 15px 10px 0 rgba(0,0,0,.5)
      }

      .login{
        height:100vh;
        
      }
      .logincon{
        padding-top:10%;
      }
      .loginform{
        width:50%;
      }
     
      @media screen and (max-width: 768px) {
        html,body{
          overflow-y:hidden;
        }
        .login{
          height:100vh;
        }
        .logincon{
          padding-top:20%;
        }
        .loginform{
          width:100%;
        }
        .otp{
          padding-top:41%;
        }
      }

      `}
      </style>

    </>
  );
};

export default Register;
