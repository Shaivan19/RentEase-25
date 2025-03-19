import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import TenantNavbar from "../tenant/TenantNavbar";
import TenantSidebar from "../tenant/TenantSidebar";

const TenantLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <TenantSidebar open={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        <TenantNavbar toggleDrawer={toggleDrawer} />

        {/* Main Content */}
        <Box component="main" sx={{ p: 3, mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default TenantLayout;
