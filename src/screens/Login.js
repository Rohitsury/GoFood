import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'
import 'aos/dist/aos.css';
import AOS from 'aos';
export default function Login() {
  const apiUrl = 'https://gofoodbackend-8rp4.onrender.com' || 'http://localhost:5000' ;

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      alert("Logged In Successfully")
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/");

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    <div>
      <Navbar />
      </div>
      <div  className='login' style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',  backgroundSize: 'cover' }}>
        <div className='container logincon' data-aos="zoom-in">
          <form className='m-auto loginform border bg-dark border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
            <Link to='/forgotpassword'>Forgot Password</Link>
          </form>

        </div>
      </div>

      <style>
        {`
        
          .login{
            height:110vh;
            
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
              height:85vh;
            }
            .logincon{
              padding-top:35%;
            }
            .loginform{
              width:100%;
            }
          }
        `}
      </style>
    </>
  )
}


// , 'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000/login', 'Access-Control-Allow-Credentials': 'true',
//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'