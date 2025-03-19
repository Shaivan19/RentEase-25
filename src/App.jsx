import { useState } from 'react'
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import "./assets/css/Adminlte.css"
import "./assets/css/adminlte.min.css"
// import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import Login from './components/common/Login'
import Signup from './components/common/SignUp'
import { Sample } from './components/common/Sample'
import axios from 'axios'
import Home from './components/common/Home'
import{Route, Routes,useLocation} from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import TenantDashboard from './components/tenant/TenantDashboard'
import ContactUs from './components/common/ContactUs'


function App() {
  axios.defaults.baseURL = "http://localhost:1909";
  const location = useLocation();

  const showNavbar = ["/home", "/login", "/signup", "/contactus"].includes(location.pathname);

  return (
    
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar">
      <div className="app-wrapper">

        {showNavbar && <Navbar/>}
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/tenant/dashboard' element={<TenantDashboard/>}></Route>
          <Route path='/sample' element={<Sample/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/contactus' element={<ContactUs/>}></Route>


          <Route path='/user' element={<UserSidebar/>}>
            <Route path='profile' element={<UserProfile/>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
