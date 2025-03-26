import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  Pagination,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  FavoriteBorder,
  Favorite,
  LocationOn,
  KingBed,
  Bathtub,
  SquareFoot,
  FilterList,
  Sort,
  Star
} from '@mui/icons-material';
import { styled } from '@mui/system';

const PropertyCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
  }
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '20px',
  fontWeight: 700,
  fontSize: '1rem',
  zIndex: 1
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(255,255,255,0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)'
  }
}));

const PropertyListingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [favorites, setFavorites] = React.useState([]);
  const [sortOption, setSortOption] = React.useState('recent');
  const [filterOpen, setFilterOpen] = React.useState(false);

  // Sample property data
  const properties = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      address: '123 Main St, New York, NY',
      price: 2500,
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      rating: 4.8,
      type: 'Apartment'
    },
    {
      id: 2,
      title: 'Luxury Waterfront Villa',
      address: '456 Beach Blvd, Miami, FL',
      price: 4500,
      beds: 4,
      baths: 3.5,
      sqft: 2800,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: false,
      rating: 4.9,
      type: 'House'
    },
    {
      id: 3,
      title: 'Cozy Studio in Arts District',
      address: '789 Art Lane, Los Angeles, CA',
      price: 1800,
      beds: 1,
      baths: 1,
      sqft: 650,
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      rating: 4.5,
      type: 'Studio'
    },
    {
      id: 4,
      title: 'Historic Brownstone',
      address: '321 Heritage Ave, Boston, MA',
      price: 3200,
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: false,
      rating: 4.7,
      type: 'Townhouse'
    },
    {
      id: 5,
      title: 'Penthouse with City Views',
      address: '555 Skyline Dr, Chicago, IL',
      price: 5000,
      beds: 3,
      baths: 3,
      sqft: 2200,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      rating: 4.9,
      type: 'Penthouse'
    },
    {
      id: 6,
      title: 'Suburban Family Home',
      address: '876 Maple St, Austin, TX',
      price: 2100,
      beds: 4,
      baths: 2,
      sqft: 2000,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: false,
      rating: 4.6,
      type: 'House'
    }
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Find Your Perfect Property
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by location, property type, or features..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
              sx: { borderRadius: '12px' }
            }}
          />
          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={() => setFilterOpen(!filterOpen)}
            sx={{
              minWidth: '120px',
              borderRadius: '12px',
              px: 3,
              whiteSpace: 'nowrap'
            }}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<Sort />}
            sx={{
              minWidth: '120px',
              borderRadius: '12px',
              px: 3,
              whiteSpace: 'nowrap'
            }}
          >
            Sort
          </Button>
        </Box>

        {filterOpen && (
          <Box sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: '12px',
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Filter Properties</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Property Type" SelectProps={{ native: true }}>
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Bedrooms" SelectProps={{ native: true }}>
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Bathrooms" SelectProps={{ native: true }}>
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Price Range" SelectProps={{ native: true }}>
                  <option value="">Any</option>
                  <option value="0-1000">₹0 - ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="2000-3000">₹2,000 - ₹3,000</option>
                  <option value="3000+">₹3,000+</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {/* Property Listings */}
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={property.image}
                  alt={property.title}
                />
                <PriceTag>₹{property.price.toLocaleString()}/mo</PriceTag>
                <FavoriteButton onClick={() => toggleFavorite(property.id)}>
                  {favorites.includes(property.id) ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </FavoriteButton>
                {property.featured && (
                  <Chip
                    label="Featured"
                    color="secondary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: theme.spacing(2),
                      left: theme.spacing(2),
                      fontWeight: 700
                    }}
                  />
                )}
              </Box>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                    {property.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star color="warning" fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600 }}>
                      {property.rating}
                    </Typography>
                  </Box>
                </Stack>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  <LocationOn fontSize="small" color="primary" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  {property.address}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <KingBed fontSize="small" color="action" />
                      <Typography variant="body2">
                        {property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Bathtub fontSize="small" color="action" />
                      <Typography variant="body2">
                        {property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <SquareFoot fontSize="small" color="action" />
                      <Typography variant="body2">
                        {property.sqft.toLocaleString()} sqft
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, py: 1.5, borderRadius: '8px', fontWeight: 600 }}
                >
                  View Details
                </Button>
              </CardContent>
            </PropertyCard>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={10}
          color="primary"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '8px',
              fontWeight: 600
            }
          }}
        />
      </Box>
    </Container>
  );
};

export default PropertyListingPage;