import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion"; // 🚀 Add Animations

const StatsCards = ({ stats }) => {
  return stats.map((stat, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card
          sx={{
            boxShadow: 4,
            borderRadius: 3,
            textAlign: "center",
            p: 3,
            background:
              "linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(33, 150, 243, 0.7))",
            color: "white",
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
              {stat.icon}
            </Box>
            <Typography variant="h6" fontWeight={700}>
              {stat.title}
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ));
};

export default StatsCards;
