/* eslint-disable react/jsx-no-undef */

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Navbar(props) {
    const [scroll, setScroll] = useState(false)
    const [cartView, setCartView] = useState(false)
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const handleScroll = () => {
        if (window.pageYOffset > 0) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      };

    const items = useCart();
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark   ${scroll ? 'fixed-top bg-black-transparent' : 'bg-tansparent'}`} onScroll={handleScroll}
                 >
                <div className="container ">
                    <NavLink className="navbar-brand navlogo fst-italic" to="/" style={{letterSpacing:'1px'}}>Go Food</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-lg-3 active" aria-current="page" to="/">HOME</NavLink>  {/* index.css - nav-link color white */}
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-lg-3 active" aria-current="page" to="/menu">MENU</NavLink>
                            </li>
                           
                            <li className="nav-item ">
                                <NavLink className="nav-link fs-5  active" aria-current="page" to="https://instagram.com/the_daddys_bbq?igshid=MzRlODBiNWFlZA==">
                                    {/* <img src={instagram} alt="" className='insta'/> */}
                                    <InstagramIcon className='' />
                                </NavLink>
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item ">
                                    <NavLink className="nav-link  me-lg-3 m-0  mx-lg-3 active" aria-current="page" to="/myorder" >My Orders</NavLink>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <NavLink className="btn navbtn mx-lg-3" to="/login">Sign in</NavLink>
                                <NavLink className="btn  navbtn mx-lg-3 ms-3" to="/signup">Sign Up</NavLink>
                            </form> :
                            <div>

                                <div className="btn me-4 navbtn " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-danger text-white" >Logout</button></div>}
                    </div>
                </div>
            </nav>


            <style>
                {`

                @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Montserrat:wght@700&family=Poppins:wght@500;600&family=Raleway:wght@600&display=swap');
                .navlogo{
                    font-size:25px;
                }
                .bg-black-transparent {
                    background-color: rgba(0, 0, 0, 0.9);  
                  }
                  .bg-tansparent{
                    background-color:tansparent;
                  }
                  nav{
                    position:fixed;
                    width:100%;
                    z-index:10;
                  }
                   
                ul .nav-link
                {
                   font-size:13px!important;
                   font-weight:bolder;
                   letter-spacing:2px;
                   font-family: Montserrat;
                }
                .contact-link {
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .contact-link::after {
                    content: '';
                        width: 1px;
                        height: 46px;  
                        background-color: white;  
                        position: absolute;
                        top: 50%;
                        right: -40px;  
                        transform: translateY(-50%);
                }
                .insta{
                    transition: .4s linear;
                }
                .insta:hover{
                    color:#febd60;
                }
                .navbtn{
                    background-color:#febd60;
                    color:rgba(0,0,0,.7);
                    letter-spacing:1px;
                    font-weight:100;
                    transition: .4s linear;
                }
                .navbtn:hover{
                    background-color:black;
                    border:2px solid white;
                }

                @media screen and (max-width: 768px) {
                   
                    ul .nav-link
                    {
                       font-size:11px!important;
                    }
                    nav{
                        position:fixed;
                    }
                     
                }
                `}
            </style>
        </>
    )
}
