// import React from "react";
// import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import LandlordSidebar from "./LandlordSidebar";
// import LandlordNavbar from "./LandlordNavbar";

// const LandlordLayout = () => {
//   return (
//     <Box sx={{display:"flex" ,minHeight:"100vh", width:"100vw", overflow:"hidden"}}>
//       {/* Sidebar */}
//       <Box flexShrink={0}>
//         <LandlordSidebar />
//       </Box>

//       {/* Main Content */}
//       <Box flexGrow={1} display="flex" flexDirection="column" width="100%">
//         {/* Navbar */}
//         <LandlordNavbar />
        
//         {/* Page Content */}
//         <Box flexGrow={1} p={3} bgcolor="#f4f6f8" width="100%">
//           <Outlet /> {/* Nested pages (Dashboard, Properties, etc.) */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LandlordLayout;
import React, { useState } from "react"; // ✅ Import useState
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LandlordSidebar from "./LandlordSidebar";
import LandlordNavbar from "./LandlordNavbar";

const LandlordLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // ✅ Sidebar state

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // ✅ Toggle function
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box flexShrink={0}>
        <LandlordSidebar isOpen={isSidebarOpen} /> {/* ✅ Pass state */}
      </Box>

      {/* Main Content */}
      <Box flexGrow={1} display="flex" flexDirection="column" width="100%">
        {/* Navbar */}
        <LandlordNavbar toggleSidebar={toggleSidebar} /> {/* ✅ Pass function */}
        
        {/* Page Content */}
        <Box flexGrow={1} p={3} bgcolor="#f4f6f8" width="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LandlordLayout;
