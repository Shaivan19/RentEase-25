import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import EarningsChart from "./components/EarningChart";
import TenantRequestsTable from "./components/TenantRequestTable";
import StatsCards from "./components/StatsCards";
import { MonetizationOn, HomeWork, Assignment } from "@mui/icons-material";

const LandlordDashboard = () => {
  return (
    <Box sx={{ width: "100%", flexGrow: 1, p: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Welcome, Landlord
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <StatsCards
          stats={[
            { title: "Total Properties", value: 12, icon: <HomeWork fontSize="large" /> },
            { title: "Pending Requests", value: 5, icon: <Assignment fontSize="large" /> },
            { title: "Total Earnings", value: "$15,240", icon: <MonetizationOn fontSize="large" /> }
          ]}
        />
      </Grid>

      <Grid container spacing={3} mt={2}>
        {/* Earnings Chart */}
        <Grid item xs={12} md={7}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={500} gutterBottom>
                Earnings Overview
              </Typography>
              <EarningsChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tenant Requests */}
        <Grid item xs={12} md={5}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={500} gutterBottom>
                Recent Tenant Requests
              </Typography>
              <TenantRequestsTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandlordDashboard;
