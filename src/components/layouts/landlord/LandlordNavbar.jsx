import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { Notifications, Menu as MenuIcon } from "@mui/icons-material";

const LandlordNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 3 }}>
      <Toolbar>
        {/* Menu Icon (For Future Mobile Sidebar Toggle) */}
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        
        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
          Landlord Dashboard
        </Typography>
        
        {/* Notifications Icon */}
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        
        {/* Profile Avatar */}
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar alt="Landlord" src="/path-to-profile-pic.jpg" />
        </IconButton>
        
        {/* Profile Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default LandlordNavbar;
