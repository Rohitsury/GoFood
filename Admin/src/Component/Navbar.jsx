import React from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GridViewIcon from '@mui/icons-material/GridView';
import { NavLink, useNavigate } from 'react-router-dom';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
function Navbar() {
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        navigate('/')
        window.location.reload()
    }
    return (
        <>
            <section className=' p-3' style={{ height: '20vh', background: '#f54749' }}>
                <nav class="navbar navbar-expand-lg navbar-light " style={{ background: 'transparent' }}>
                    <div class="container-fluid">
                        <RestaurantIcon className='me-2 text-white fs-2' /><a class="navbar-brand fs-3 fw-bold" style={{ fontFamily: 'sans-serif', color: 'white' }}>Daddy'sBBQ </a>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">


                            <form class="d-flex justify-content-center text-white  ms-auto   pt-3 p-2 px-4" style={{ background: 'rgba(255,255,255,.2' }}>
                                <AdminPanelSettingsIcon className='fs-3' /> <h5 className='fw-bold'>BBQ</h5> <ChevronRightIcon className='fs-3' />
                            </form>
                        </div>
                    </div>
                </nav>
            </section>

            <section className='bg-white justify-content-center' style={{ height: '10vh', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', marginTop: '-50px' }}>
                <div className="container">
                    <nav class="navbar navbar-expand-lg navbar-light " style={{ width: '110%', marginLeft: '-5%', background: 'transparent' }}>
                        <div class="container-fluid">

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li class="nav-item">
                                        <NavLink className="nav-link me-5 px-5 fw-bold  " exact style={{fontSize:'17px', paddingTop:'10px',paddingBottom:'10px'}} activeClassName='active' aria-current="page" to="/dashboard"><span className='' style={{ marginRight: '5px' }}><GridViewIcon /></span>Dashboard</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink className="nav-link me-5 px-5 fw-bold  " exact style={{fontSize:'17px', paddingTop:'10px',paddingBottom:'10px'}} activeClassName='active' aria-current="page" to="/Addnewitem"><span className='' style={{ marginRight: '5px' }}><LunchDiningIcon /></span>Add Menu</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink className="nav-link me-5 px-5 fw-bold  " exact style={{fontSize:'17px', paddingTop:'10px',paddingBottom:'10px'}} activeClassName='active' aria-current="page" to="/vieworders"><span className='' style={{ marginRight: '5px' }}><AddShoppingCartIcon /></span>View Orders</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink className="nav-link me-5 px-5 fw-bold  "  exact style={{fontSize:'17px', paddingTop:'10px',paddingBottom:'10px'}} activeClassName='active' aria-current="page" to="/" onClick={handleLogout} ><span className=''  style={{ marginRight: '5px' }}><LogoutIcon /></span>Logout</NavLink>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>
            </section>

            <style>
                {`
                .active{
                    background-color:#f54749;
                    color:white;
                    border-radius:10px;
                }
                `}
            </style>

        </>
    )
}

export default Navbar