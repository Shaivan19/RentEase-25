// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userName, setUserName] = useState(null); // Stores logged-in username

//   // Show navbar only on specific pages
//   const allowedPages = ["/home", "/login", "/signup"];
//   if (!allowedPages.includes(location.pathname)) return null;

//   // Fetch user details from localStorage on mount
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user")); // Expecting { userId, username }
//     if (storedUser) {
//       setUserName(storedUser.username);
//     }
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Remove user details
//     setUserName(null); // Clear username state
//     toast.success("Logged out successfully!", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//     navigate("/home");
//   };

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.logo}>
//         <Link to="/home" style={styles.navLink}>
//           RentEase
//         </Link>
//       </div>

//       {/* Aligns to Right */}
//       <ul style={styles.navLinks}>
//         <li><Link to="/home" style={styles.navLink}>Home</Link></li>
//         <li><Link to="/properties" style={styles.navLink}>Properties</Link></li>
//         <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
//       </ul>

//       <div style={styles.userSection}>
//         {userName ? (
//           <>
//             <motion.span
//               style={styles.userName}
//               onClick={() => navigate("/profile")}
//               whileHover={{ scale: 1.1 }}
//             >
//               {userName} ⬇
//             </motion.span>
//             <motion.button 
//               onClick={handleLogout} 
//               style={styles.logoutButton}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Logout
//             </motion.button>
//           </>
//         ) : (
//           <motion.button
//             onClick={() => navigate("/login")}
//             style={styles.loginButton}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Login
//           </motion.button>
//         )}
//       </div>
//     </nav>
//   );
// };

// // Navbar Styles
// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 30px",
//     background: "#0072ff",
//     color: "white",
//     position: "fixed",
//     width: "100%",
//     top: "0",
//     left: "0",
//     zIndex: "1000",
//   },
//   logo: {
//     fontSize: "22px",
//     fontWeight: "bold",
//   },
//   navLinks: {
//     listStyle: "none",
//     display: "flex",
//     gap: "20px",
//     marginLeft: "auto", // Pushes links to the right
//   },
//   navLink: {
//     textDecoration: "none",
//     color: "white",
//     fontSize: "16px",
//     fontWeight: "500",
//   },
//   userSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     marginLeft: "20px", // Adds spacing between navbar links and user options
//   },
//   userName: {
//     fontWeight: "bold",
//     cursor: "pointer",
//     color: "#fff",
//     textDecoration: "underline",
//   },
//   loginButton: {
//     backgroundColor: "#ff6f00",
//     color: "white",
//     padding: "8px 15px",
//     borderRadius: "6px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
//   logoutButton: {
//     backgroundColor: "#ff0000",
//     color: "white",
//     padding: "8px 15px",
//     borderRadius: "6px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
// };

// export default Navbar;


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

  const allowedPages = ["/home", "/login", "/signup"];
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

