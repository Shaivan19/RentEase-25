import { useState, useEffect } from 'react'
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import "./assets/css/Adminlte.css"
import "./assets/css/adminlte.min.css"
// import { Route, Routes } from 'react-router-dom'
import UserProfile from './components/user/UserProfile'
import Login from './components/common/Login'
import Signup from './components/common/SignUp'
import { Sample } from './components/common/Sample'
import axios from 'axios'
import Home from './components/common/Home'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import TenantDashboard from './components/layouts/tenant/TenantDashboard'
import ContactUs from './components/common/ContactUs'
import LandingPage from './components/common/LandingPage'
import LandlordDashboard from './components/layouts/landlord/LandlordDashboard'
import MyProperties from './components/layouts/landlord/MyProperties'
import LandlordLayout from './components/layouts/landlord/LandlordLayout'
import AddProperty from './components/layouts/landlord/AddProperty'
import TermsAndConditions from './components/common/TnC'
// import PropertyListing from './components/common/PropertyListing'
import AboutUs from './components/common/AboutUs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import AuthDebugger from './components/common/AuthDebugger'
// import { isLoggedIn, isUserType } from './utils/auth'
import PropertyListingPage from './components/common/PropertList'
import LandlordProperties from './components/layouts/landlord/LandlordProperties'
import PropertyDetails from './components/property/PropertyDetails'
import TenantLayout from './components/layouts/tenant/TenantLayout'
import { isLoggedIn, getUserType } from './utils/auth'
<<<<<<< HEAD
import SavedProperties from './components/layouts/tenant/components/SavedProperties'
// import ResetPassword from './components/common/ResetPassword'
=======
>>>>>>> 006a48759ff01842cdea22feec6a6135197e021c

// Protected route component
const ProtectedRoute = ({ children, allowedUserTypes }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  
  // Check if user type is required and if user has that type
  const userType = getUserType();
  if (allowedUserTypes && !allowedUserTypes.includes(userType?.toLowerCase())) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  axios.defaults.baseURL = "http://localhost:1909";
  const location = useLocation();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const showNavbar = ["/", "/home", "/login", "/signup", "/contactus", "/properties", "/aboutus", "/terms"].includes(location.pathname);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar">
        <div className="app-wrapper">
          {showNavbar && <Navbar/>}
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/terms' element={<TermsAndConditions/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/properties' element={<PropertyListingPage/>}></Route>
            <Route path='/aboutus' element={<AboutUs/>}></Route>
            <Route path='/contactus' element={<ContactUs/>}></Route>
            {/* <Route path='/reset-password' element={<ResetPassword/>}></Route> */}
            
            {/* Tenant protected routes */}
            <Route 
              path='/tenant' 
              element={
                <ProtectedRoute allowedUserTypes={["tenant"]}>
                  <TenantLayout/>
                </ProtectedRoute>
              }
            >
              <Route path='dashboard' element={<TenantDashboard/>}></Route>
              <Route path='profile' element={<UserProfile/>}></Route>
              <Route path='savedproperties' element={<SavedProperties/>}></Route>
            
            </Route>
            

            {/* Landlord protected routes */}
            <Route 
              path="/landlord" 
              element={
                <ProtectedRoute role="landlord" allowedRoles={["landlord"]}>
                  <LandlordLayout />
                </ProtectedRoute>
              }
            >
              <Route path='dashboard' element={<LandlordDashboard/>}></Route>
              <Route path='properties' element={<LandlordProperties/>}></Route>
              <Route path='addnewproperty' element={<AddProperty/>}></Route>
              <Route path='edit-property/:id' element={<AddProperty/>}></Route>

              
              <Route path='profile' element={<UserProfile/>}></Route>
              <Route path='settings' element={<UserProfile/>}></Route>
            </Route>
            
            {/* User protected routes */}
            <Route 
              path='/user' 
              element={
                <ProtectedRoute>
                  <UserSidebar/>
                </ProtectedRoute>
              }
            >
              <Route path='profile' element={<UserProfile/>}></Route>
            </Route>
            
            {/* Sample route - should be protected or removed in production */}
            <Route path='/sample' element={<Sample/>}></Route>
            
            {/* Property Details route */}
            <Route path='/property/:id' element={<PropertyDetails/>}></Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Include the auth debugger in development environment only */}
          {isDevelopment && <AuthDebugger />}
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default App