import React from 'react';
import Image from './ipl_logo.jpg'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Navbar.scss'
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-left">
        <img src={Image} alt="Logo" className="navbar-logo" />
       </div>
      <ul className="navbar-nav">
        <span className='nav-item'>
          <Link to="/home" className="nav-link">Home</Link>
         </span><span className='nav-item'><Link to="/teams" className="nav-link">Teams</Link>
         </span>
         <span className='nav-item'><Link to="/pointstable" className="nav-link">Points Table</Link></span>
         <span className='nav-item'><Link to="/stats" className="nav-link">Stats</Link></span>
         {/* <span className='nav-item'><Link to="/auction" className="nav-link">Auction</Link> </span>*/}</ul>
      <div className="navbar-right">
        <Link to="/login" className="nav-link">Sign Out</Link>
      </div>
    </nav>
  );
}

export default Navbar;
