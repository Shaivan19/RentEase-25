import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null); 

  // Show navbar only on Home, Login, Signup pages
  const allowedPages = ["/home", "/login", "/signup"];
  if (!allowedPages.includes(location.pathname)) return null;

  // Load user info on mount & listen for changes in localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    loadUser();
    window.addEventListener("storage", loadUser); // Listen for storage changes
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    toast.success("Logged out successfully!", { position: "top-right", autoClose: 2000 });
    navigate("/home");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/home" style={styles.navLink}>RentEase</Link>
      </div>

      {/* Aligns Home, Properties, Contact to the right */}
      <ul style={styles.navLinks}>
        <li><Link to="/home" style={styles.navLink}>Home</Link></li>
        <li><Link to="/properties" style={styles.navLink}>Properties</Link></li>
        <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
      </ul>

      <div style={styles.userSection}>
        {user ? (
          <>
            <motion.span
              style={styles.userName}
              onClick={() => navigate("/profile")}
              whileHover={{ scale: 1.1 }}
            >
              {user.username} ⬇
            </motion.span>
            <motion.button 
              onClick={handleLogout} 
              style={styles.logoutButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          <motion.button
            onClick={() => navigate("/login")}
            style={styles.loginButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        )}
      </div>
    </nav>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#0072ff",
    color: "white",
    position: "fixed",
    width: "100%",
    top: "0",
    left: "0",
    zIndex: "1000",
  },
  logo: { fontSize: "22px", fontWeight: "bold" },
  navLinks: { 
    listStyle: "none", 
    display: "flex", 
    gap: "20px", 
    marginLeft: "auto" 
  },
  navLink: { textDecoration: "none", color: "white", fontSize: "16px", fontWeight: "500" },
  userSection: { display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" },
  userName: { fontWeight: "bold", cursor: "pointer", color: "#fff", textDecoration: "underline" },
  loginButton: { backgroundColor: "#ff6f00", color: "white", padding: "8px 15px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "16px" },
  logoutButton: { backgroundColor: "#ff0000", color: "white", padding: "8px 15px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "16px" },
};

export default Navbar;
