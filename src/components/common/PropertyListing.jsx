import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Stack,
  Pagination,
  useTheme,
  useMediaQuery,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  SquareFoot,
  Favorite,
  FavoriteBorder,
  FilterList,
} from '@mui/icons-material';

const properties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'Downtown, City',
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    images: ['https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true'],
    amenities: ['Parking', 'Gym', 'Pool'],
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Luxury Villa with View',
    location: 'Highland Hills, Suburb',
    price: 3800,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: 'Villa',
    images: ['https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true'],
    amenities: ['Pool', 'Security', 'Garden'],
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Cozy Studio Apartment',
    location: 'University District, City',
    price: 1200,
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    type: 'Studio',
    images: ['https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true'],
    amenities: ['Furnished', 'Elevator', 'Pet Friendly'],
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Family Home with Garden',
    location: 'Pleasant Valley, Suburb',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: 'House',
    images: ['https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true'],
    amenities: ['Parking', 'Garden', 'Pet Friendly'],
    isFavorite: false,
  },
  {
    id: 5,
    title: 'Penthouse with City Views',
    location: 'Central District, City',
    price: 4500,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    type: 'Apartment',
    images: ['https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true'],
    amenities: ['Parking', 'Gym', 'Security', 'Elevator'],
    isFavorite: false,
  },
  {
    id: 6,
    title: 'Modern Townhouse',
    location: 'Riverside Area, City',
    price: 2800,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1600,
    type: 'Townhouse',
    images: ['https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true'],
    amenities: ['Parking', 'Pet Friendly', 'Furnished'],
    isFavorite: false,
  },
];

const PropertyListing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState({});

  const amenities = [
    'Parking',
    'Gym',
    'Pool',
    'Security',
    'Elevator',
    'Pet Friendly',
    'Furnished',
    'Garden',
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => ({ ...prev, [propertyId]: !prev[propertyId] }));
  };

  const FilterDrawer = () => (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 3,
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Filters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Refine your property search
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom fontWeight="medium">Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={100}
          marks
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom fontWeight="medium">Property Type</Typography>
        <FormControl fullWidth size="small">
          <Select defaultValue="">
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
            <MenuItem value="townhouse">Townhouse</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography gutterBottom fontWeight="medium">Amenities</Typography>
        <Grid container spacing={1}>
          {amenities.map((amenity) => (
            <Grid item xs={6} key={amenity}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    size="small"
                  />
                }
                label={<Typography variant="body2">{amenity}</Typography>}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 4 }}
        onClick={() => setFilterDrawerOpen(false)}
      >
        Apply Filters
      </Button>
    </Drawer>
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
        pt: { xs: '64px', sm: '70px' }, // Add padding top to account for navbar height
        boxSizing: 'border-box'
      }}
    >
      <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 }, width: '100%' }}>
        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                placeholder="Search by location, property type, or amenities..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="medium"
                sx={{ 
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilterDrawerOpen(true)}
                size="large"
                sx={{ 
                  height: '100%', 
                  minHeight: '56px',
                  borderRadius: 1
                }}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: 4 }}
        >
          Available Properties
        </Typography>

        {/* Property Grid */}
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.images[0]}
                    alt={property.title}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'white',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      '&:hover': {
                        bgcolor: 'white',
                      },
                    }}
                    onClick={() => toggleFavorite(property.id)}
                  >
                    {favorites[property.id] ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {property.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {property.location}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 600, mt: 1 }}
                  >
                    ₹{property.price}/month
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      mb: 2,
                      mt: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BedIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BathtubIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SquareFoot fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        {property.area} sqft
                      </Typography>
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Chip
                        key={amenity}
                        label={amenity}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                    {property.amenities.length > 3 && (
                      <Chip
                        label={`+${property.amenities.length - 3}`}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  </Stack>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ 
                      mt: 'auto',
                      borderRadius: 1,
                      py: 1.25
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
          <Pagination
            count={3}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
            siblingCount={1}
          />
        </Box>

        {/* Filter Drawer */}
        <FilterDrawer />
      </Container>
    </Box>
  );
};

export default PropertyListing; 