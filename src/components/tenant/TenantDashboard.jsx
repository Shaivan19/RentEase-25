import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Card, CardContent, Avatar, Divider, Container } from "@mui/material";
import TenantNavbar from "./TenantNavbar";
import TenantSidebar from "./TenantSidebar";
import PaymentsIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";

const TenantDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* Sidebar */}
      <TenantSidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Navbar */}
      <TenantNavbar toggleDrawer={toggleDrawer} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: "100vw" }}>
        <Container maxWidth={false}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>Welcome to Your Dashboard</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Manage your bookings, payments, and saved properties here.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {/* Cards */}
              {[{
                icon: <DashboardIcon fontSize="large" color="primary" />, title: "Dashboard Overview", description: "Quick insights into your activities." },
                { icon: <PaymentsIcon fontSize="large" color="success" />, title: "Payments", description: "View and manage your transactions." },
                { icon: <FavoriteIcon fontSize="large" color="error" />, title: "Saved Properties", description: "Check your favorite listings." },
                { icon: <CalendarMonthIcon fontSize="large" color="info" />, title: "Bookings", description: "Manage your upcoming visits." }
              ].map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2, boxShadow: 3, width: "100%" }}>
                    <Avatar sx={{ bgcolor: "#0072ff", width: 50, height: 50, mr: 2 }}>
                      {card.icon}
                    </Avatar>
                    <CardContent>
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default TenantDashboard;