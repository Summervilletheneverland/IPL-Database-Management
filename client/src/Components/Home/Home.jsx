import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.scss'
function Home() {
  return (
    <div className='home_page'>
      <div> 
           <Navbar/>
           <div className=''>
            <h1 className='welcome'>Welcome to IPL Database Management</h1>
           </div>
      </div>
    </div>
  )
}

export default Home
