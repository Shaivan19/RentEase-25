import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const allowedPages = ["/home", "/login", "/signup","/contactus", "/"];
  if (!allowedPages.includes(location.pathname)) return null;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName(null);
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/home");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "Properties", icon: <BusinessIcon />, path: "/properties" },
    { text: "Contact", icon: <ContactMailIcon />, path: "/contactus" },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#0072ff", zIndex: 1000, boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => navigate("/home")}
        >
          RentEase
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {menuItems.map((item) => (
            <Button key={item.text} color="inherit" startIcon={item.icon} onClick={() => navigate(item.path)}>
              {item.text}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton sx={{ display: { xs: "block", md: "none" } }} color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List sx={{ width: 250 }}>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => { navigate(item.path); setDrawerOpen(false); }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Profile & Auth Buttons */}
        <Box>
          {userName ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>Profile</MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{ borderColor: "white", color: "white", fontWeight: "bold" }}
              >
                Login
              </Button>
            </motion.div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

