import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../layouts/Navbar";

const Background = styled(Box)(({ theme }) => ({
  backgroundImage:
    "url(https://github.com/Shaivan19/mybackgrounds/blob/main/webbackground_optimized.png?raw=true)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#ffffff",
  textAlign: "center",
  padding: theme.spacing(4),
  backdropFilter: "brightness(0.7)",
  marginTop: "64px",  // 🛠️ Fix: Push content down by 64px
  [theme.breakpoints.down("sm")]: {
    marginTop: "56px",}
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 2),
}));

const LandingPage = () => {
  return (
    <>
      <Navbar /> {/* Your Navbar is now included at the top */}
      
      {/* Hero Section */}
      <Background>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            Welcome to RentEase
          </Typography>
          <Typography
            variant="h5"
            paragraph
            sx={{ opacity: 0.9, maxWidth: "600px", margin: "0 auto" }}
          >
            Simplify your rental experience with our advanced platform.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
          >
            Get Started
          </Button>
        </Container>
      </Background>

      {/* Features Section */}
      <Section sx={{ backgroundColor: "#f5f5f5" }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {[
              { title: "Easy to Use", description: "Our platform is simple and user-friendly." },
              { title: "Secure", description: "We use advanced encryption for your safety." },
              { title: "Reliable", description: "Count on us for a seamless rental experience." },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ opacity: 0.7 }}>{feature.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* About Section */}
      <Section>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            About Us
          </Typography>
          <Typography variant="h6" align="center" sx={{ opacity: 0.7, maxWidth: "800px", margin: "0 auto" }}>
            RentEase makes renting easier, faster, and more secure for both landlords and tenants.
          </Typography>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section sx={{ backgroundColor: "#eeeeee" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Get in Touch
          </Typography>
          <Typography align="center" sx={{ opacity: 0.7 }}>
            Have questions? Contact us and we’ll be happy to assist!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button variant="contained" color="primary">
              Contact Us
            </Button>
          </Box>
        </Container>
      </Section>
    </>
  );
};

export default LandingPage;
