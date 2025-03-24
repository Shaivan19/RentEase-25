import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Collapse } from "@mui/material";
import { Home, Business, MonetizationOn, Person, ExitToApp, Menu, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LandlordSidebar = ({ isOpen, toggleSidebar }) => {
  const [openProperties, setOpenProperties] = useState(false);

  return (
    <Drawer variant="persistent" open={isOpen} onClose={toggleSidebar} sx={{ "& .MuiDrawer-paper": { width: 250, backgroundColor: "#1e1e2d", color: "white" } }}>
      <IconButton onClick={toggleSidebar} sx={{ color: "white", margin: 1 }}>
        <Menu />
      </IconButton>
      <List>
        <ListItemButton component={Link} to="/landlord/dashboard">
          <ListItemIcon sx={{ color: "white" }}><Home /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => setOpenProperties(!openProperties)}>
          <ListItemIcon sx={{ color: "white" }}><Business /></ListItemIcon>
          <ListItemText primary="My Properties" />
          {openProperties ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProperties} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/landlord/properties">
              <ListItemText primary="View Properties" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/landlord/addnewproperty">
              <ListItemText primary="Add Property" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton component={Link} to="/landlord/earnings">
          <ListItemIcon sx={{ color: "white" }}><MonetizationOn /></ListItemIcon>
          <ListItemText primary="Earnings" />
        </ListItemButton>

        <ListItemButton component={Link} to="/landlord/profile">
          <ListItemIcon sx={{ color: "white" }}><Person /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton component={Link} to="/logout" sx={{ color: "red" }}>
          <ListItemIcon sx={{ color: "red" }}><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
export default LandlordSidebar;