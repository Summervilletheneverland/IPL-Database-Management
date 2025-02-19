import React from 'react'
import './App.scss'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LoginRegister from './Components/LoginRegister/LoginRegister'
import Home from './Components/Home/Home'
import Admin from './Components/Admin/Admin.js'
import Team from './Components/Team/Team'
import Auction from './Components/Auction/Auction'
import Stats from './Components/Stats/Stats'
import Pointstable from './Components/Pointstable/Pointstable'
import Teams_admin from './Components/Admin/Teams_admin.js'
import Auction_admin from './Components/Admin/Auction_admin.js'
import Stats_admin from './Components/Admin/Stats_admin.js'
import Pointstable_admin from './Components/Admin/Pointstable_admin.js'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element= {<LoginRegister/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/home_admin" element={<Admin/>}/>
          <Route path='/teams' element={<Team/>}/>
          {/* <Route path='/auction' element={<Auction/>}/> */}
          <Route path='/stats' element={<Stats/>}/>
          <Route path='/pointstable' element={<Pointstable/>}/>
          <Route path='/teams_admin' element={<Teams_admin/>}/>
          {/* <Route path='/auction_admin' element={<Auction_admin/>}/> */}
          <Route path='/stats_admin' element={<Stats_admin/>}/>
          <Route path='/pointstable_admin' element={<Pointstable_admin/>}/>
          <Route path='/login' element={<LoginRegister/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
