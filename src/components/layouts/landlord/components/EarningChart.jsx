import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Box, useTheme } from "@mui/material";

const data = [
  { month: "Jan", earnings: 2000, target: 2500 },
  { month: "Feb", earnings: 3500, target: 3000 },
  { month: "Mar", earnings: 5000, target: 3500 },
  { month: "Apr", earnings: 4200, target: 4000 },
  { month: "May", earnings: 6000, target: 4500 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 1,
          borderRadius: 1,
          boxShadow: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ color: "text.secondary", mb: 0.5 }}>{label}</Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
            <Box>Earnings: ${payload[0].value}</Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
              }}
            />
            <Box>Target: ${payload[1].value}</Box>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
};

const EarningsChart = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.1} />
              <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.palette.divider}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="earnings"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorEarnings)"
            strokeWidth={2}
            dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke={theme.palette.success.main}
            fillOpacity={1}
            fill="url(#colorTarget)"
            strokeWidth={2}
            dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EarningsChart;
