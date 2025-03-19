import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";

const TenantSidebar = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openPayments, setOpenPayments] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Drawer variant="temporary" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ "& .MuiDrawer-paper": { width: 280, backgroundColor: "#1e1e2d", color: "white" } }}>
      <List>
        {[{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" }].map((item) => (
          <Tooltip title={item.text} placement="right" key={item.text}>
            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)} sx={{ "&.Mui-selected": { backgroundColor: "#282846" } }}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Tooltip>
        ))}

        <ListItemButton onClick={() => setOpenPayments(!openPayments)}>
          <ListItemIcon sx={{ color: "white" }}>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
          {openPayments ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={openPayments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/payments/history")}>
              <ListItemText primary="Payment History" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/payments/methods")}>
              <ListItemText primary="Payment Methods" />
            </ListItemButton>
          </List>
        </Collapse>

        {[{ text: "Saved Properties", icon: <FavoriteIcon />, path: "/saved-properties" }, { text: "Support", icon: <SupportAgentIcon />, path: "/support" }].map((item) => (
          <Tooltip title={item.text} placement="right" key={item.text}>
            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)} sx={{ "&.Mui-selected": { backgroundColor: "#282846" } }}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Tooltip>
        ))}

        <ListItemButton onClick={handleLogout} sx={{ color: "red" }}>
          <ListItemIcon sx={{ color: "red" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default TenantSidebar;