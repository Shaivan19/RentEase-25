import React from "react";
import { Box } from "@mui/material";
import LandlordSidebar from "./LandlordSidebar";
import LandlordNavbar from "./LandlordNavbar";

const LandlordLayout = ({ children }) => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <LandlordSidebar />
      
      {/* Main Content */}
      <Box flexGrow={1} display="flex" flexDirection="column">
        {/* Navbar */}
        <LandlordNavbar />
        
        {/* Page Content */}
        <Box flexGrow={1} p={3} bgcolor="#f4f6f8">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LandlordLayout;
