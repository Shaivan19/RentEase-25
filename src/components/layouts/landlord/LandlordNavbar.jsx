import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Badge, Tooltip } from "@mui/material";
import { Notifications, Menu as MenuIcon, Logout, Settings, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LandlordNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2C3E50", boxShadow: 3, zIndex: 1201 }}>
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <Tooltip title="Toggle Sidebar">
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Tooltip>

        {/* Dashboard Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
          Landlord Dashboard
        </Typography>

        {/* Notifications with Badge */}
        <Tooltip title="Notifications">
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={toggleSidebar}>
            <Badge badgeContent={3} color="error"> {/* Dynamic Notifications Count */}
              <Notifications />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip title="Profile Menu">
          <IconButton onClick={handleMenuOpen} color="inherit" >
            <Avatar alt="Landlord" src="/path-to-profile-pic.jpg" />
          </IconButton>
        </Tooltip>

        {/* Profile Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} sx={{ mt: 1 }}>
          <MenuItem onClick={() => navigate("/landlord/profile")}>
            <Person sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={() => navigate("/landlord/settings")}>
            <Settings sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default LandlordNavbar;
