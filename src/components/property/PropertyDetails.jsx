import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { isLoggedIn } from '../../utils/auth';
import Navbar from '../layouts/Navbar';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      if (!isLoggedIn()) {
        navigate('/login');
        return;
      }
      fetchPropertyDetails();
    };

    checkAuth();
  }, [id, navigate]);

  useEffect(() => {
    if (selectedImage && property?.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === property.images.length - 1 ? 0 : prev + 1
        );
        setSelectedImage(property.images[currentImageIndex]);
      }, 3000); // Change image every 3 seconds

      setAutoSlideInterval(interval);
    }

    return () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    };
  }, [selectedImage, property?.images, currentImageIndex]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`/properties/${id}`);
      setProperty(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch property details');
      setLoading(false);
    }
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  };

  const handlePreviousImage = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
    setSelectedImage(property.images[currentImageIndex]);
  };

  const handleNextImage = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
    setSelectedImage(property.images[currentImageIndex]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!property) {
    return (
      <Box p={3}>
        <Alert severity="warning">Property not found</Alert>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ pt: 8, pb: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Main Image Display */}
            <Grid item xs={12}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 0, 
                  mb: 3, 
                  position: 'relative',
                  height: '500px',
                  overflow: 'hidden',
                  borderRadius: 2
                }}
              >
                {property.images && property.images.length > 0 ? (
                  <Box
                    component="img"
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: 'grey.100'
                    }}
                  >
                    <Typography color="text.secondary">
                      No images available for this property
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Thumbnail Gallery */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                {property.images && property.images.length > 0 ? (
                  <ImageList 
                    cols={6} 
                    rowHeight={100} 
                    gap={8}
                    sx={{ 
                      overflowX: 'auto',
                      flexWrap: 'nowrap',
                      '&::-webkit-scrollbar': {
                        height: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: theme.palette.grey[200],
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px',
                      },
                    }}
                  >
                    {property.images.map((image, index) => (
                      <ImageListItem 
                        key={index}
                        onClick={() => handleImageClick(image, index)}
                        sx={{ 
                          cursor: 'pointer',
                          border: currentImageIndex === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={image}
                          alt={`Property ${index + 1}`}
                          loading="lazy"
                          style={{ height: '100px', objectFit: 'cover' }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : null}
              </Paper>
            </Grid>

            {/* Property Details */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                  {property.title}
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    label={property.status} 
                    color={property.status === 'Available' ? 'success' : 'error'} 
                    size="large"
                  />
                  <Typography variant="h5" color="primary">
                    ₹{property.price.toLocaleString()}/month
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <BedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">{property.bedrooms}</Typography>
                      <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <BathIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">{property.bathrooms}</Typography>
                      <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <AreaIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">{property.area}</Typography>
                      <Typography variant="body2" color="text.secondary">sq ft</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <LocationIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {property.location}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {property.description}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Features
                </Typography>
                <Grid container spacing={2}>
                  {property.features && property.features.length > 0 ? (
                    property.features.map((feature, index) => (
                      <Grid item xs={6} sm={4} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="primary">•</Typography>
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        No features listed for this property
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Contact Landlord
                </Typography>
                <List>
                  {property.landlord && property.landlord.phone && (
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={property.landlord.phone} />
                    </ListItem>
                  )}
                  {property.landlord && property.landlord.email && (
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={property.landlord.email} />
                    </ListItem>
                  )}
                </List>
                {property.landlord && property.landlord.email ? (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={() => window.location.href = `mailto:${property.landlord.email}`}
                  >
                    Contact via Email
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Contact information not available
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Image Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={handlePreviousImage}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
            }}
          >
            <NavigateNextIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Property"
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              maxHeight: '90vh',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyDetails; 