import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const data = [
  { month: "Jan", earnings: 2000 },
  { month: "Feb", earnings: 3500 },
  { month: "Mar", earnings: 5000 },
  { month: "Apr", earnings: 4200 },
  { month: "May", earnings: 6000 },
];

const EarningsChart = () => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 3, backgroundColor: "#f8f9fa" }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Earnings Overview
        </Typography>
        <Box width="100%" height={300}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#1976d2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EarningsChart;
