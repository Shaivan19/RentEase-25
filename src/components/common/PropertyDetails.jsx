import React, { useState } from 'react';
import Navbar from '../../components/layouts/Navbar';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  Divider,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  LocationOn,
  Bed,
  Bath,
  SquareFoot,
  Favorite,
  FavoriteBorder,
  Share,
  CalendarToday,
  Pets,
  LocalParking,
  FitnessCenter,
  Pool,
  Security,
  Elevator,
  Wifi,
  AcUnit,
  DirectionsCar,
  DirectionsTransit,
  DirectionsWalk,
} from '@mui/icons-material';

const property = {
  id: 1,
  title: 'Modern Downtown Apartment',
  location: 'Downtown, City',
  price: 2500,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  type: 'Apartment',
  description: `This stunning modern apartment offers the perfect blend of comfort and style. Located in the heart of downtown, it provides easy access to shopping, dining, and entertainment venues. The open-concept living area features floor-to-ceiling windows with breathtaking city views.

The kitchen is fully equipped with stainless steel appliances and granite countertops. The master bedroom includes a walk-in closet and an en-suite bathroom. The second bedroom is perfect for guests or a home office.

Building amenities include a 24-hour concierge, fitness center, swimming pool, and secure parking. The apartment is pet-friendly and includes high-speed internet and central air conditioning.`,
  images: [
    '/property1.jpg',
    '/property2.jpg',
    '/property3.jpg',
    '/property4.jpg',
  ],
  amenities: [
    { name: 'Parking', icon: <LocalParking /> },
    { name: 'Gym', icon: <FitnessCenter /> },
    { name: 'Pool', icon: <Pool /> },
    { name: 'Security', icon: <Security /> },
    { name: 'Elevator', icon: <Elevator /> },
    { name: 'WiFi', icon: <Wifi /> },
    { name: 'AC', icon: <AcUnit /> },
    { name: 'Pet Friendly', icon: <Pets /> },
  ],
  transportation: [
    { type: 'Car', time: '5 min', icon: <DirectionsCar /> },
    { type: 'Transit', time: '10 min', icon: <DirectionsTransit /> },
    { type: 'Walk', time: '15 min', icon: <DirectionsWalk /> },
  ],
  isFavorite: false,
};

const PropertyDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleContactFormChange = (event) => {
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    // Add contact form submission logic here
    setContactDialogOpen(false);
  };

  const ContactDialog = () => (
    <Dialog
      open={contactDialogOpen}
      onClose={() => setContactDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Contact Landlord</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleContactSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={contactForm.name}
                onChange={handleContactFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={contactForm.phone}
                onChange={handleContactFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={contactForm.message}
                onChange={handleContactFormChange}
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setContactDialogOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleContactSubmit}
        >
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Navbar />
      <Box sx={{ 
        width: '100%',
        minHeight: '100vh',
        pt: '64px',
        bgcolor: 'background.default'
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Image Gallery */}
            <Grid item xs={12} md={8}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <IconButton
                    sx={{
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'white' },
                    }}
                  >
                    <Share />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'white' },
                    }}
                  >
                    {property.isFavorite ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Grid container spacing={1}>
                {property.images.map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      sx={{
                        cursor: 'pointer',
                        border: selectedImage === index
                          ? `2px solid ${theme.palette.primary.main}`
                          : '2px solid transparent',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '80px',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Property Info */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  ₹{property.price}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    /month
                  </Typography>
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {property.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body1" color="text.secondary">
                    {property.location}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bed fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body1">
                      {property.bedrooms} beds
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bath fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body1">
                      {property.bathrooms} baths
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SquareFoot fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body1">
                      {property.area} sqft
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setContactDialogOpen(true)}
                >
                  Contact Landlord
                </Button>
              </Paper>

              {/* Transportation */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Transportation
                </Typography>
                <Stack spacing={2}>
                  {property.transportation.map((item) => (
                    <Box
                      key={item.type}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {item.icon}
                      <Typography variant="body1">
                        {item.type}: {item.time}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>

              {/* Amenities */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {property.amenities.map((amenity) => (
                    <Grid item xs={6} key={amenity.name}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {amenity.icon}
                        <Typography variant="body2">
                          {amenity.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* Description and Details */}
          <Box sx={{ mt: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
            >
              <Tab label="Description" />
              <Tab label="Details" />
              <Tab label="Location" />
            </Tabs>

            {tabValue === 0 && (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {property.description}
              </Typography>
            )}

            {tabValue === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Property Details
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Property Type
                      </Typography>
                      <Typography variant="body1">{property.type}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Bedrooms
                      </Typography>
                      <Typography variant="body1">{property.bedrooms}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Bathrooms
                      </Typography>
                      <Typography variant="body1">{property.bathrooms}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Square Footage
                      </Typography>
                      <Typography variant="body1">{property.area} sqft</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Available From
                      </Typography>
                      <Typography variant="body1">
                        <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
                        Immediate
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Lease Term
                      </Typography>
                      <Typography variant="body1">12 months</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Security Deposit
                      </Typography>
                      <Typography variant="body1">₹{property.price}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            )}

            {tabValue === 2 && (
              <Box sx={{ height: 400, bgcolor: 'grey.100' }}>
                {/* Add map component here */}
              </Box>
            )}
          </Box>

          {/* Contact Dialog */}
          <ContactDialog />
        </Container>
      </Box>
    </>
  );
};

export default PropertyDetails; 