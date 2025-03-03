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


function App() {
  axios.defaults.baseURL = "http://localhost:1909";
  const location = useLocation();

  const showNavbar = ["/home", "/login", "/signup"].includes(location.pathname);

  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar">
      <div className="app-wrapper">

        {showNavbar && <Navbar/>}
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup2' element={<Sample/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/user' element={<UserSidebar/>}>
            <Route path='profile' element={<UserProfile/>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
