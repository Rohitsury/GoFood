import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Images/rs2.jpg'
import pic from '../components/Images/pic.png'
import menuimg from '../components/Images/menu.jpg'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { NavLink } from 'react-router-dom'
import PlaceIcon from '@mui/icons-material/Place';
import GoogleMap from './GoogleMap';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import Footer from '../components/Footer'
import 'aos/dist/aos.css';
import AOS from 'aos';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div  style={{ background: `linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.35)),url(${Main})`, height: '100vh', backgroundSize: '100% 100%', backgroundAttachment: 'fixed' }}>
        <Navbar />
        <div className='title d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <h1 data-aos="zoom-in">ONLINE FOOD DELIVERY</h1>
        </div>

        <div className='bg-white'>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 image-container   justify-content-center d-flex">
                <img src={pic} alt="" data-aos="zoom-in" className='mt-5 mb-5 image-with-border img-fluid' />
              </div>
              {/* <div className="col-lg-6 col-12 mt-5 mb-5 image-container   justify-content-center d-flex">
                <img src={pic} alt="" className='mt-5 mb-5 image-with-border img-fluid' />
              </div>  */}
            </div>
          </div>
        </div>

        <div className='menu' style={{ background: `linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,.35)),url(${menuimg})`,  backgroundSize: '100% 100%', backgroundAttachment: 'fixed' }}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-7 menudiv" >
                <div className='justify-content-center d-flex '>
                  <h1 data-aos="zoom-in" style={{ letterSpacing: '3px' }}>OUR MENUS</h1>
                </div>
                <hr className='w-50 line' />
              </div>
              <div className="col-12 col-lg-7 mt-lg-5 mt-md-5 mt-0  menuitem">
                <div className='row'>
                  <div className="col-6 col-lg-6 text-center ps-lg-5  " data-aos="zoom-in">
                    <h5 className='' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Paneer Tikka <span className=' '>____________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>75</span></h5>
                    <h5 className='mt-4' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Mashroom Kebab <span className=' '>________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>70</span></h5>
                    <h5 className='mt-4' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Gobe Rice <span className=' '>_______________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>25</span></h5>
                    <h5 className='mt-4' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Lemon Rice <span className=' '>_____________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>50</span></h5>

                  </div>
                  <div className="col-6 col-lg-6 " data-aos="zoom-in">
                    <h5 style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Chicken hariyali<span className=' '>________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>90</span></h5>
                    <h5 className='mt-4' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Chicken wings<span className=' '>__________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>70</span></h5>
                    <h5 className='mt-4' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Chicken tikka<span className=' '>___________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>85</span></h5>
                    <h5 className='mt-4' style={{ fontFamily: 'timesnewroman', fontWeight: 'bold' }}>Chicken HotDog<span className=' '>_________</span> <span className='text-warning'><CurrencyRupeeIcon className='rupees'/>80</span></h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-7 justify-content-center align-items-center d-flex ">
                  <NavLink className='btn menubtn mt-5 me-lg-5 ' to='/menu'><AssignmentOutlinedIcon className='me-2 menubtnicon text-warning' />FULL MENU</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 mt-5 mb-5 justify-content-start">
                <div className="row">
                  <div className="col-lg-6 col-12 d-flex justify-content-center">
                    <div class="card cardinfo" data-aos="zoom-right" style={{ width: '18rem', height: '13rem' }}>
                      <div class="card-body">
                        <PlaceIcon className='mapicons' />
                        <h4 class="card-title">Address</h4>
                        <p class="card-text">Rpd main road, opposite Gogte college, Hanuman Nagar, Hindwadi, Belagavi, Karnataka 590006</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-center">
                    <div class="card cardinfo" data-aos="zoom-in" style={{ width: '18rem', height: '13rem' }}>
                      <div class="card-body">
                        <LocalPhoneOutlinedIcon className='mapicons' />
                        <h4 class="card-title">Call Us</h4>
                        <p class="card-text">70269 58453</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-6 col-12 d-flex justify-content-center">
                    <div class="card cardinfo" data-aos="zoom-in" style={{ width: '18rem', height: '13rem' }}>
                      <div class="card-body">
                        <EmailOutlinedIcon className='mapicons' />
                        <h4 class="card-title">Email Us</h4>
                        <a class="card-text" href='https://mail.google.com/' target='_blank'>BBQ@gmail.com</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-center">
                    <div class="card cardinfo" data-aos="zoom-in" style={{ width: '18rem', height: '13rem' }}>
                      <div class="card-body">
                        <WatchLaterOutlinedIcon className='mapicons' />
                        <h4 class="card-title">Open Hours</h4>
                        <p class="card-text">Monday - Sunday <br />
                          10:00AM - 10:00PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 map mt-lg-5" id="google-map" style={{ height: '58vh' }}>
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <style>

        {`
         @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Montserrat:wght@700&family=Poppins:wght@500;600&family=Raleway:wght@600&display=swap');

         @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Montserrat:wght@700&family=Open+Sans:wght@300;400&family=Poppins:wght@500;600&family=Raleway:wght@600&display=swap');
        .title h1{
          font-size:70px;
          letter-spacing:2px;
          font-family: Montserrat;
        }
        .image-container img {
          filter: saturate(1.5); /* Adjust the value to control the saturation level. 1 is the default (no change). Values above 1 increase saturation, values below 1 decrease it. */
          z-index: 2;
        }
       .menubtn{
          border:1px solid white;
          padding:.6rem 2rem;
       }
       .menubtnicon{
        font-size:25px;
        margin-bottom:2px;
       }
       .mapicons{
        font-size:50px;
        margin-bottom:12px;
        color:red;
       }
       .line{
        height:4px!important;
        margin-left:11.5rem;
       }
       .cardinfo{
        background-color:#f4f4f4;
       }
       .cardinfo h4{
          color:black;
          font-family:Montserrat;
       }
       .cardinfo p{
        color:black;
        font-family:Open Sans;
        font-size:14px;
        font-weight:500;
      }
      .menudiv{
        margin-top:10%;
      }
      .menu{
        height:100vh;
      }

      @media screen and (max-width: 768px) {
        .title h1{
          font-size:50px;
          letter-spacing:1px;
          text-align:center;
          margin-top:-10rem;
        }
        .menuitem h5, .rupees{
          font-size:11px;
        }
        .line{
          left:0;
          right:0;
          margin:auto;
          margin-bottom:2rem;
        }
        .menudiv{
          margin-top:20%;
        }
        .menu{
          height:73vh;
        }
       
      }


        `}
      </style>




    </>
  )
}


export default Home

