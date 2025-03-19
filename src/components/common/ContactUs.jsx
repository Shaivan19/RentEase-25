import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!"); // Replace with API call if needed
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", py: 8, px: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        📞 Contact Us
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Contact Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Get In Touch
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">support@rentease.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">+91 98765 43210</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Anupam Society-1, Near Rathi Hospital, Ahmedabad
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Send a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                variant="outlined"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                fullWidth
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          📍 Our Location
        </Typography>
        <MapContainer
          center={[23.033863, 72.585022]} // Ahmedabad Coordinates
          zoom={15}
          style={{ height: "400px", width: "100%", borderRadius: "8px", marginTop: "20px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[23.033863, 72.585022]}>
            <Popup>📍 RentEase Office, Anupam Society-1, Near Rathi Hospital, Ahmedabad</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default ContactUs;
