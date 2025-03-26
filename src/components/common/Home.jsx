import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Rating,
  Container,
  Chip,
  IconButton,
  useTheme,
  Divider,
  Stack,
  Tabs,
  Tab,
  Pagination,
  Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { alpha } from "@mui/material/styles";
import { KingBed, Bathtub, SquareFoot } from "@mui/icons-material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import L from 'leaflet';

// Fix for Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Enhanced Sample Data
const properties = [
  { 
    id: 1, 
    title: "Modern Apartment", 
    location: "Mumbai, India", 
    price: "₹25,000/month", 
    image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", 
    rating: 4.5,
    beds: 2,
    baths: 1,
    sqft: 850,
    featured: true
  },
  { 
    id: 2, 
    title: "Luxury Villa", 
    location: "Bangalore, India", 
    price: "₹80,000/month", 
    image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", 
    rating: 4.8,
    beds: 4,
    baths: 3,
    sqft: 2200,
    featured: false
  },
  { 
    id: 3, 
    title: "Cozy Studio", 
    location: "Pune, India", 
    price: "₹15,000/month", 
    image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", 
    rating: 4.2,
    beds: 1,
    baths: 1,
    sqft: 500,
    featured: true
  },
  { 
    id: 4, 
    title: "Spacious Bungalow", 
    location: "Delhi, India", 
    price: "₹1,50,000/month", 
    image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", 
    rating: 4.7,
    beds: 5,
    baths: 4,
    sqft: 3500,
    featured: false
  },
];

const officeSpaces = [
  { 
    id: 1, 
    title: "Corporate Tower", 
    location: "Mumbai, India", 
    price: "₹1,50,000/month", 
    image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", 
    rating: 4.6,
    size: "2000 sqft",
    capacity: "20 people"
  },
  { 
    id: 2, 
    title: "IT Office Space", 
    location: "Bangalore, India", 
    price: "₹1,00,000/month", 
    image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", 
    rating: 4.8,
    size: "1500 sqft",
    capacity: "15 people"
  },
];

const Home = () => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const PropertyCard = ({ property }) => (
    <Card
      component={motion.div}
      whileHover={{ y: -5 }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={property.image}
          alt={property.title}
        />
        <Box sx={{ 
          position: "absolute",
          top: 16,
          left: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1
        }}>
          {property.featured && (
            <Chip
              label="Featured"
              color="secondary"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          )}
          <Chip
            label={property.price}
            color="primary"
            sx={{ 
              fontWeight: 700,
              backgroundColor: alpha(theme.palette.primary.main, 0.9),
              color: 'white'
            }}
          />
        </Box>
        <IconButton
          onClick={() => toggleFavorite(property.id)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": { backgroundColor: "white" },
          }}
        >
          {favorites[property.id] ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {property.title}
          </Typography>
          <Rating 
            value={property.rating} 
            precision={0.5} 
            readOnly 
            size="small"
            sx={{ ml: 1 }}
          />
        </Stack>
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LocationOnIcon color="primary" sx={{ mr: 1 }} fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {property.location}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <KingBed fontSize="small" color="action" />
              <Typography variant="body2">
                {property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Bathtub fontSize="small" color="action" />
              <Typography variant="body2">
                {property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <SquareFoot fontSize="small" color="action" />
              <Typography variant="body2">
                {property.sqft} sqft
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        
        <Button
          variant="contained"
          fullWidth
          startIcon={<CalendarTodayIcon />}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600
          }}
        >
          Schedule Visit
        </Button>
      </CardContent>
    </Card>
  );

  const OfficeCard = ({ office }) => (
    <Card
      component={motion.div}
      whileHover={{ y: -5 }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        height: '100%'
      }}
    >
      <Grid container>
        <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            height="100%"
            image={office.image}
            alt={office.title}
            sx={{ height: { xs: 200, md: '100%' } }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {office.title}
              </Typography>
              <Rating 
                value={office.rating} 
                precision={0.5} 
                readOnly 
                size="small"
                sx={{ ml: 1 }}
              />
            </Stack>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon color="primary" sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {office.location}
              </Typography>
            </Box>
            
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              {office.price}
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight={500}>
                  <Box component="span" color="text.secondary">Size:</Box> {office.size}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight={500}>
                  <Box component="span" color="text.secondary">Capacity:</Box> {office.capacity}
                </Typography>
              </Grid>
            </Grid>
            
            <Button 
              variant="contained" 
              fullWidth
              sx={{
                mt: 'auto',
                borderRadius: 2,
                py: 1.5,
                fontWeight: 600
              }}
            >
              View Details
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );

  return (
    <Box 
      component="main" 
      sx={{ 
        width: '100vw',
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: '64px', sm: '70px' },
        boxSizing: 'border-box'
      }}
    >
      {/* Hero Section with Visible Background */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '70vh', md: '90vh' },
          backgroundImage: "url('https://github.com/Shaivan19/mybackgrounds/blob/main/webbackground_optimized.png?raw=true')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: 'fixed',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)'
          }
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            color: "white",
            textAlign: "center",
            px: { xs: 2, sm: 4, md: 6 },
            width: '100%'
          }}
        >
          <Typography
            component={motion.h1}
            {...fadeInUp}
            variant="h1"
            fontWeight="bold"
            sx={{ 
              mb: 3,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Discover Your Perfect Space
          </Typography>
          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="h5"
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Find the ideal home or office across India's top cities
          </Typography>
          <Box
            component={motion.div}
            {...fadeInUp}
            sx={{
              width: "100%",
              maxWidth: 800,
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              placeholder="Search by location, property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 2,
                '& .MuiFilledInput-root': {
                  height: '56px',
                  borderRadius: 2,
                  '&:before, &:after': { display: 'none' }
                },
                '& .MuiFilledInput-input': {
                  py: '14px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                minWidth: { xs: "100%", sm: "140px" },
                height: "56px",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Popular Cities Section */}
      <Box sx={{ py: 8, bgcolor: 'white', width: '100%' }}>
        <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            Explore Popular Cities
          </Typography>
          
          <Typography
            component={motion.p}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}
          >
            Discover rental properties in India's most sought-after locations
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { name: 'Mumbai', image: 'https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true', count: 350 },
              { name: 'Delhi', image: 'https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true', count: 285 },
              { name: 'Bangalore', image: 'https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true', count: 420 },
              { name: 'Hyderabad', image: 'https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true', count: 215 },
              { name: 'Chennai', image: 'https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true', count: 190 },
              { name: 'Pune', image: 'https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true', count: 175 }
            ].map((city) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={city.name}
                component={motion.div}
                whileHover={{ y: -10 }}
              >
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: 200,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                      zIndex: 1
                    }
                  }}
                  onClick={() => navigate('/properties')}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={city.image}
                    alt={city.name}
                    sx={{ position: 'absolute' }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      p: 3,
                      width: '100%',
                      zIndex: 2
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                      {city.name}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {city.count} Properties
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default', width: '100%' }}>
        <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            How RentEase Works
          </Typography>
          
          <Typography
            component={motion.p}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            Simple steps to find your perfect home or manage your property
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <SearchIcon fontSize="large" />,
                title: "Search Properties",
                description: "Browse thousands of verified listings across India with detailed filters to find what you need.",
                color: "#3f51b5"
              },
              {
                icon: <ContactMailIcon fontSize="large" />,
                title: "Connect Directly",
                description: "Contact landlords or tenants without middlemen and schedule viewings at your convenience.",
                color: "#f44336"
              },
              {
                icon: <HomeIcon fontSize="large" />,
                title: "Secure Agreement",
                description: "Complete digital rental agreements with secure payments and transparent terms.",
                color: "#009688"
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: step.color,
                      width: 80,
                      height: 80,
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/properties')}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontWeight: 'bold'
              }}
            >
              Explore Properties
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'white', width: '100%' }}>
        <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            What Our Users Say
          </Typography>
          
          <Typography
            component={motion.p}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            Thousands of satisfied landlords and tenants trust RentEase
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                name: "Priya Sharma",
                role: "Tenant",
                review: "RentEase made finding my new apartment so simple. The filter options helped me narrow down exactly what I wanted, and I could contact the landlord directly without any broker fees.",
                avatar: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Landlord",
                review: "Managing my rental properties has never been easier. The dashboard gives me a clear overview of all my properties, and I can quickly handle maintenance requests and payments in one place.",
                avatar: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true",
                rating: 4.5
              },
              {
                name: "Ananya Patel",
                role: "Tenant",
                review: "I've used several rental platforms, but RentEase stands out for its user-friendly interface and responsive support team. Found my dream apartment in just three days!",
                avatar: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Rating value={testimonial.rating} precision={0.5} readOnly sx={{ mb: 2 }} />
                  
                  <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
                    "{testimonial.review}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box 
        sx={{ 
          py: 8, 
          bgcolor: 'primary.main', 
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{
              maxWidth: 800,
              mx: 'auto',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
              Stay Updated with RentEase
            </Typography>
            
            <Typography variant="body1" color="rgba(255,255,255,0.8)" sx={{ mb: 4 }}>
              Subscribe to our newsletter for the latest property listings and rental tips
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <TextField
                placeholder="Enter your email address"
                fullWidth
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  },
                  flexShrink: 0
                }}
              >
                Subscribe
              </Button>
            </Box>
            
            <Typography variant="caption" color="rgba(255,255,255,0.6)" sx={{ mt: 2, display: 'block' }}>
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Property Listings */}
      <Box sx={{ py: 8, position: 'relative', width: '100%' }}>
        <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ mb: 6 }}
          >
            <Tab label="Residential" icon={<ApartmentIcon />} iconPosition="start" />
            <Tab label="Commercial" icon={<BusinessIcon />} iconPosition="start" />
          </Tabs>
          
          {tabValue === 0 && (
            <>
              <Typography
                component={motion.h2}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                sx={{ mb: 6 }}
              >
                Featured Residential Properties
              </Typography>
              
              <Grid container spacing={3}>
                {properties.map((property, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                    <PropertyCard property={property} />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={5}
                  color="primary"
                  shape="rounded"
                  size="large"
                />
              </Box>
            </>
          )}
          
          {tabValue === 1 && (
            <>
              <Typography
                component={motion.h2}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                sx={{ mb: 6 }}
              >
                Premium Office Spaces
              </Typography>
              
              <Grid container spacing={3}>
                {officeSpaces.map((office, index) => (
                  <Grid item xs={12} md={6} key={office.id}>
                    <OfficeCard office={office} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>

      {/* Map Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50', width: '100%' }}>
        <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Explore Properties on Map
          </Typography>
          
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            sx={{
              height: "500px",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 3,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <MapContainer
              center={[23.033863, 72.585022]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[23.033863, 72.585022]}>
                <Popup>
                  <Typography variant="subtitle2" fontWeight="bold">
                    RentEase Office
                  </Typography>
                  <Typography variant="body2">
                    Anupam Society-1, Near Rathi Hospital, Ahmedabad
                  </Typography>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Typography textAlign="center" variant="body1">
            © {new Date().getFullYear()} RentEase. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;