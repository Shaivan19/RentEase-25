import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Business, MonetizationOn, Person, ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LandlordSidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem button component={Link} to="/landlord/dashboard">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        <ListItem button component={Link} to="/landlord/properties">
          <ListItemIcon><Business /></ListItemIcon>
          <ListItemText primary="My Properties" />
        </ListItem>
        
        <ListItem button component={Link} to="/landlord/earnings">
          <ListItemIcon><MonetizationOn /></ListItemIcon>
          <ListItemText primary="Earnings" />
        </ListItem>
        
        <ListItem button component={Link} to="/landlord/profile">
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        
        <ListItem button component={Link} to="/logout">
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LandlordSidebar;
