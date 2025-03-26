import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  ListItemIcon,
  ListItemText,
  InputBase,
} from "@mui/material";
import {
  Notifications,
  Menu as MenuIcon,
  Logout,
  Settings,
  Person,
  DarkMode,
  LightMode,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LandlordNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const open = Boolean(anchorEl);
  const notificationsOpen = Boolean(notificationsAnchor);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const notifications = [
    { id: 1, title: "New Property Request", message: "John Doe requested to rent your apartment", time: "5 min ago" },
    { id: 2, title: "Payment Received", message: "Received ₹1,500 for March rent", time: "1 hour ago" },
    { id: 3, title: "Maintenance Update", message: "Plumbing work completed at 123 Main St", time: "2 hours ago" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <Tooltip title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}>
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{
              mr: 2,
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        {/* Search Bar */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            bgcolor: theme.palette.action.hover,
            borderRadius: 2,
            px: 2,
            py: 0.5,
            mr: 2,
            flex: 1,
            maxWidth: 400,
          }}
        >
          <Search sx={{ color: theme.palette.text.secondary, mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{ width: "100%" }}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Theme Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton
              color="inherit"
              onClick={() => {
                // Add theme toggle logic here
              }}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Avatar */}
          <Tooltip title="Profile Menu">
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                p: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Avatar
                alt="Landlord"
                src="/path-to-profile-pic.jpg"
                sx={{
                  width: 32,
                  height: 32,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={notificationsOpen}
          onClose={handleNotificationsClose}
          PaperProps={{
            sx: {
              maxHeight: 400,
              width: 360,
              mt: 1,
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" fontWeight={600}>
              Notifications
            </Typography>
          </Box>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleNotificationsClose}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="subtitle1" fontWeight={600}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              john.doe@example.com
            </Typography>
          </Box>
          <MenuItem onClick={() => navigate("/landlord/profile")}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => navigate("/landlord/settings")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default LandlordNavbar;
