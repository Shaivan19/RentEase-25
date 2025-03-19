import React from "react";
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
  Rating
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


// Sample Data for Properties
const properties = [
  { id: 1, title: "Modern Apartment", location: "Mumbai, India", price: "₹25,000/month", image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", rating: 4.5 },
  { id: 2, title: "Luxury Villa", location: "Bangalore, India", price: "₹80,000/month", image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", rating: 4.8 },
  { id: 3, title: "Cozy Studio", location: "Pune, India", price: "₹15,000/month", image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", rating: 4.2 },
  { id: 4, title: "Spacious Bungalow", location: "Delhi, India", price: "₹1,50,000/month", image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", rating: 4.7 },
];

// Office Rentals Data
const officeSpaces = [
  { id: 1, title: "Corporate Tower", location: "Mumbai, India", price: "₹1,50,000/month", image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", rating: 4.6 },
  { id: 2, title: "IT Office Space", location: "Bangalore, India", price: "₹1,00,000/month", image: "https://github.com/Shaivan19/mybackgrounds/blob/main/an%20apartment.png?raw=true", rating: 4.8 },
];

const Home = () => {
  return (
    <Box sx={{ width: "100vw", overflowX: "hidden" }}>
      
      {/* 🔹 Hero Section */}
      <Box sx={{
        width: "100%",
        height: "80vh",
        backgroundImage: "url('https://github.com/Shaivan19/mybackgrounds/blob/main/webbackground_optimized.png?raw=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2
      }}>
        <Typography variant="h3" fontWeight="bold">Find Your Dream Home</Typography>
        <Typography variant="h6">Search from thousands of rental properties</Typography>
        <TextField
          variant="outlined"
          placeholder="Search by city or property type..."
          sx={{ mt: 2, width: "80%", maxWidth: 500, background: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 🔹 Featured Properties */}
      <Box sx={{ width: "100%", py: 8, px: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">🏡 Featured Properties</Typography>
        <Grid container spacing={3} justifyContent="center">
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={3} key={property.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, cursor: "pointer", height: "100%" }}>
                <CardMedia component="img" height="200" image={property.image} alt={property.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{property.title}</Typography>
                  <Typography variant="body2">{property.location}</Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">{property.price}</Typography>
                  <Rating value={property.rating} precision={0.5} readOnly />
                  <Button variant="contained" sx={{ mt: 1, width: "100%" }}>Schedule a Visit</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔹 Office Rentals Section */}
      <Box sx={{ width: "100%", py: 8, px: 3, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">🏢 Office Spaces for Rent</Typography>
        <Grid container spacing={3} justifyContent="center">
          {officeSpaces.map((office) => (
            <Grid item xs={12} sm={6} md={3} key={office.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, cursor: "pointer", height: "100%" }}>
                <CardMedia component="img" height="200" image={office.image} alt={office.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{office.title}</Typography>
                  <Typography variant="body2">{office.location}</Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">{office.price}</Typography>
                  <Rating value={office.rating} precision={0.5} readOnly />
                  <Button variant="contained" sx={{ mt: 1, width: "100%" }}>Schedule a Visit</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔹 Property Video Tour */}
      <Box sx={{ width: "100%", py: 8, px: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">🎥 Virtual Property Tour</Typography>
        <iframe
          width="80%"
          height="400"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Property Tour"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>

      {/* 🔹 Map Section */}
<Box sx={{ width: "100%", py: 8, px: 3 }}>
  <Typography variant="h4" fontWeight="bold" textAlign="center">
    📍 Find Properties Near You
  </Typography>

  <MapContainer
    center={[23.033863, 72.585022]}  // Coordinates for Ahmedabad
    zoom={15}
    style={{ height: "400px", width: "100%", borderRadius: "8px", marginTop: "20px" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* RentEase Office Marker */}
    <Marker position={[23.033863, 72.585022]}>
      <Popup>📍 RentEase Office, Anupam Society-1, Near Rathi Hospital, Ahmedabad</Popup>
    </Marker>
  </MapContainer>
</Box>


      {/* 🔹 Footer */}
      <Box sx={{ width: "100%", backgroundColor: "black", color: "white", textAlign: "center", py: 2 }}>
        <Typography variant="body2">© 2025 RentEase. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
