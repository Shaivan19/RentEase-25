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
import LandingPage from './components/common/LandingPage'
import LandlordDashboard from './components/layouts/landlord/LandlordDashboard'
import MyProperties from './components/layouts/landlord/MyProperties'
import LandlordLayout from './components/layouts/landlord/LandlordLayout'
import AddProperty from './components/layouts/landlord/AddProperty'
import TermsAndConditions from './components/common/TnC'


function App() {
  axios.defaults.baseURL = "http://localhost:1909";
  const location = useLocation();

  const showNavbar = ["/home", "/login", "/signup", "/contactus"].includes(location.pathname);

  return (
    
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar">
      <div className="app-wrapper">

        {showNavbar && <Navbar/>}
        <Routes>
          <Route path='/' element={<LandingPage/  >}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/tenant/dashboard' element={<TenantDashboard/>}></Route>
          <Route path="/landlord/*" element={<LandlordLayout/>}>
            <Route path='dashboard' element={<LandlordDashboard/>}></Route>
            <Route path='properties' element={<MyProperties/>}></Route>
            <Route path='addnewproperty' element={<AddProperty/>}></Route>
          </Route>
          <Route path='/sample' element={<Sample/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/terms' element={<TermsAndConditions/>}></Route>
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
