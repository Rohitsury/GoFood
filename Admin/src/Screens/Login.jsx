import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import loginimg from '../assets/Loginimg.jpg'
import loginmain from '../assets/loginmain.jpg'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [credentials, setcredentials] = useState({ userid: "", password: "" })

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userid: credentials.userid, password: credentials.password })
    })

    const json = await res.json();

    if (!json.success) {
      alert("Invalid Credentials")
    }
    if (json.success) {
      localStorage.setItem("authtoken", json.authtoken)
      alert("Successfully Logged in")
      console.log(localStorage.getItem("authtoken"))
      navigate("/dashboard")
    }
  }

  const onChnage = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      
      <section className='justify-content-center align-items-center d-flex' style={{
        background: 'linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', backgroundSize: '100% 100%', height: '100vh'
      }}>
        <div className="session d-flex justify-content-center align-items-center "  >

          {/* <div className="left" style={{ backgroundImage: `url(${loginimg})` }}> */}
          {/* </div> */}
          <form onSubmit={handleSubmit} className="log-in" autocomplete="off">
            <h4 className='mb-3 text-white 'style={{ marginLeft: '28%' }}>Admin Login</h4>

            <div className="floating-label">
              <input placeholder="Email" type="email" name="userid" id="email" autocomplete="off" value={credentials.userid} onChange={onChnage} />
            </div>
            <div className="floating-label">
              <input placeholder="Password" type="password" name="password" id="password" autocomplete="off" value={credentials.password} onChange={onChnage} />
            </div>
            <button type="submit" className='text-dark' style={{ marginLeft: '30%' }}>Log in</button>

          </form>
        </div>
      </section>

      <style>
        {`
               
                h4 {
                  font-size:  24px; 
                  font-weight:  600; 
                  color:  #000; 
                  opacity:  .85; 
                }
                label {
                  font-size:  12.5px; 
                  color:  #000;
                  opacity:  .8;
                  font-weight:  400; 
                }
                form {
                  padding:  40px 30px; 
                  background-color:transparent!important; 
                  display:  flex; 
                  flex-direction:  column;
                  align-items:  flex-start; 
                  padding-bottom:  20px; 
                  width:  300px; 
                }
                h4 {
                  margin-bottom:  20px;
                  color:  rgba(#000, .5);
                  span {
                    color:  rgba(#000, 1);
                    font-weight:  700; 
                  }
                  p {
                    line-height:  155%; 
                    margin-bottom:  5px; 
                    font-size:  14px; 
                    color:  #000; 
                    opacity:  .65;
                    font-weight:  400; 
                    max-width:  200px; 
                    margin-bottom:  40px; 
                  }
                }
                a.discrete {
                    color:  rgba(#000, .4); 
                    font-size:  14px; 
                    border-bottom:  solid 1px rgba(#000, .0);
                    padding-bottom:  4px;  
                    margin-left:  auto; 
                    font-weight:  300; 
                    transition:  all .3s ease; 
                    margin-top:  40px; 
                    &:hover {
                      border-bottom:  solid 1px rgba(#000, .2);
                    }
                  }
                button {
                  -webkit-appearance:  none; 
                  width:  auto;
                  min-width:  100px;
                  border-radius:  24px; 
                  text-align:  center; 
                  padding:  15px 40px;
                  margin-top:  5px; 
                  background-color:  saturate($primary, 30%); 
                  color:  #fff; 
                  font-size:  14px;
                  
                  font-weight:  500; 
                  box-shadow:  0px 2px 6px -1px rgba(0,0,0,.13); 
                  border:  none;
                  transition:  all .3s ease; 
                  outline: 0; 
                  &:hover {
                    transform:  translateY(-3px);
                    box-shadow:  0 2px 6px -1px rgba($primary, .65);
                    &:active {
                      transform:  scale(.99);
                    }
                  }
                }
                input {
                  font-size:  16px; 
                  padding:  20px 0px; 
                  height:  56px; 
                  border:  2px solid white; 
                  background:  transparent; 
                  padding-left:5px;
                  width:  280px; 
                  box-sizing:  border-box; 
                  transition:  all .3s linear; 
                  color:  #fff; 
                  
                  font-weight:  bold;
                  -webkit-appearance:  none; 
                  &:focus {
                    border-bottom:  solid 1px $primary; 
                    outline: 0; 
                    box-shadow:  0 2px 6px -8px rgba($primary, .45);
                  }
                }
                .floating-label {
                  position:  relative; 
                  margin-bottom:  10px;
                  width:  100%; 
                  label {
                    position:  absolute; 
                    top: calc(50% - 7px);
                    left:  0; 
                    opacity:  0; 
                    transition:  all .3s ease; 
                    padding-left:  44px; 
                  }
                  input {
                    width:  calc(100% - 44px); 
                    margin-left:  auto;
                    display:  flex; 
                  }
                  .icon {
                    position:  absolute; 
                    top:  0; 
                    left:  0; 
                    height:  56px; 
                    width:  44px; 
                    display:  flex; 
                    svg {
                      height:  30px; 
                      width:  30px; 
                      margin:  auto;
                      opacity:  .15; 
                      transition:  all .3s ease; 
                      path {
                        transition:  all .3s ease; 
                      }
                    }
                  }
                  input:not(:placeholder-shown) {
                    padding:  28px 0px 12px 0px; 
                  }
                  input:not(:placeholder-shown) + label {
                    transform:  translateY(-10px); 
                    opacity:  .7; 
                  }
                  input:valid:not(:placeholder-shown) + label + .icon {
                    svg {
                      opacity:  1; 
                      path {
                        fill:  $primary; 
                      }      
                    }
                  }
                  input:not(:valid):not(:focus) + label + .icon {
                    animation-name: shake-shake;
                    animation-duration: .3s;
                  }
                }
                $displacement:  3px; 
                @keyframes shake-shake {
                  0% { transform: translateX(-$displacement);}
                  20% { transform: translateX($displacement); }
                  40% { transform: translateX(-$displacement);}
                  60% { transform: translateX($displacement);}  
                  80% { transform: translateX(-$displacement);}
                  100% { transform: translateX(0px);}
                }
                .session {
                  display:  flex; 
                  flex-direction:  row; 
                  width:  30%; 
                  height:  50vh; 
                  margin:  0; 
                  background:  transparent;
                  // border:2px solid white; 
                  border-radius:  4px; 
                  box-shadow:  0px 8px 8px 0px rgba(0,0,0,.6);
                }
                .left {
                  width:  220px; 
                  height:  auto; 
                  min-height:  100%; 
                  position:  relative; 
                //   background-image: url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
               
                  background-size:  cover;
                  border-top-left-radius:  4px; 
                  border-bottom-left-radius:  4px; 
                  svg {
                    height:  40px; 
                    width:  auto; 
                    margin:  20px; 
                  }
                }
                
                `}
      </style>
    </>
  )
}

export default Login