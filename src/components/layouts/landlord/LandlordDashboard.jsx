import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  MonetizationOn,
  HomeWork,
  Assignment,
  TrendingUp,
  NotificationsActive,
  Refresh,
} from "@mui/icons-material";
import EarningsChart from "./components/EarningChart";
import TenantRequestsTable from "./components/TenantRequestTable";
import StatsCards from "./components/StatsCards";

const LandlordDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // Add refresh logic here
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1, p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: "primary.main" }}>
            Welcome back, Landlord
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's what's happening with your properties today
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} color="primary">
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="primary">
              <NotificationsActive />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <StatsCards
          stats={[
            {
              title: "Total Properties",
              value: 12,
              icon: <HomeWork fontSize="large" />,
              trend: "+2",
              trendColor: "success.main",
            },
            {
              title: "Pending Requests",
              value: 5,
              icon: <Assignment fontSize="large" />,
              trend: "-1",
              trendColor: "error.main",
            },
            {
              title: "Total Earnings",
              value: "$15,240",
              icon: <MonetizationOn fontSize="large" />,
              trend: "+12%",
              trendColor: "success.main",
            },
          ]}
        />
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Earnings Chart */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Earnings Overview
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TrendingUp color="success" />
                <Typography variant="body2" color="success.main">
                  +12% from last month
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <EarningsChart />
          </Paper>
        </Grid>

        {/* Recent Tenant Requests */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Recent Tenant Requests
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <TenantRequestsTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandlordDashboard;
