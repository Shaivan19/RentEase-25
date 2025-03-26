import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactConfig } from "../../config/contact";
import { sendContactForm } from "../../services/contactService";

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const ContactUs = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await sendContactForm(data);
      setSnackbar({
        open: true,
        message: response.data?.message || "Message sent successfully! We'll get back to you soon.",
        severity: "success",
      });
      reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to send message. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const socialMediaIcons = {
    facebook: <Facebook />,
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkedin: <LinkedIn />
  };

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: '100vh', 
      width: '100%', 
      overflow: 'hidden',
      pt: { xs: '64px', sm: '70px' } // Add padding top to account for navbar height
    }}>
      {/* Header Section */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#0072ff',
          color: 'white',
          py: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="h6">
          Have questions about RentEase? We're here to help you find the perfect rental solution.
        </Typography>
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth={false} sx={{ mt: 6, mb: 6, width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Left side - Company Information */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom color="primary">
                Company Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone" 
                    secondary={contactConfig.phone} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={contactConfig.email} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Address" 
                    secondary={contactConfig.address} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon>
                    <AccessTime color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Business Hours" 
                    secondary={
                      <>
                        <Typography variant="body2">Weekdays: {contactConfig.businessHours.weekdays}</Typography>
                        <Typography variant="body2">Saturday: {contactConfig.businessHours.saturday}</Typography>
                        <Typography variant="body2">Sunday: {contactConfig.businessHours.sunday}</Typography>
                      </>
                    } 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }} fontWeight="bold">
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {Object.entries(contactConfig.socialMedia).map(([platform, url]) => (
                  <Button 
                    key={platform}
                    href={url} 
                    target="_blank"
                    variant="contained" 
                    color="primary"
                    sx={{ minWidth: 'auto', p: 1 }}
                  >
                    {socialMediaIcons[platform]}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          {/* Right side - Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom color="primary">
                Send Us a Message
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      {...register("subject")}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      {...register("message")}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{
                        bgcolor: '#0072ff',
                        color: 'white',
                        py: 1.5,
                        '&:hover': {
                          bgcolor: '#0059cc'
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Container maxWidth={false} sx={{ mt: 4, mb: 6, width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" gutterBottom fontWeight="bold" color="primary">
            Our Location
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ height: '400px', width: '100%' }}>
            <MapContainer
              center={[contactConfig.location.lat, contactConfig.location.lng]}
              zoom={contactConfig.location.zoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[contactConfig.location.lat, contactConfig.location.lng]}>
                <Popup>
                  <Typography variant="subtitle2" fontWeight="bold">
                    RentEase Office
                  </Typography>
                  <Typography variant="body2">
                    {contactConfig.address}
                  </Typography>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
