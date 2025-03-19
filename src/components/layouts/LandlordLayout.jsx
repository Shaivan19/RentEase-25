import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router-dom";

const LandlordLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar / Drawer */}
      <Drawer variant="temporary" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ "& .MuiDrawer-paper": { width: 250 } }}>
        <List>
          {[{ text: "Dashboard", icon: <DashboardIcon />, path: "/landlord/dashboard" },
            { text: "Add Property", icon: <AddHomeIcon />, path: "/landlord/add-property" },
            { text: "My Listings", icon: <ListAltIcon />, path: "/landlord/listings" },
            { text: "Support", icon: <SupportAgentIcon />, path: "/landlord/support" },
          ].map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "#ff9800" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Landlord Panel</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LandlordLayout;
