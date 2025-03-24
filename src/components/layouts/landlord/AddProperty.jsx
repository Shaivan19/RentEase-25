import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Grid,
  Input,
  Select,
} from "@mui/material";

const propertyTypes = ["Apartment", "House", "Villa", "Studio", "Commercial"];
const amenitiesList = ["WiFi", "Parking", "Swimming Pool", "Gym", "Security", "Garden"];

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    furnished: false,
    availableFrom: new Date(),
    amenities: [],
    images: [],
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Landlord ID not found. Please log in again.");
      window.location.href = "/users/login";
    }
  }, []);

  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setPropertyData({ ...propertyData, furnished: e.target.checked });
  };

  const handleAmenityChange = (e) => {
    setPropertyData({ ...propertyData, amenities: e.target.value });
  };

  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setPropertyData({ ...propertyData, images: filesArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", propertyData.title);
    formData.append("description", propertyData.description);
    formData.append("price", propertyData.price);
    formData.append("location", propertyData.location);
    formData.append("ownerId", user.userId);
    formData.append("ownerName", user.username);
    formData.append("propertyType", propertyData.propertyType);
    formData.append("bedrooms", propertyData.bedrooms);
    formData.append("bathrooms", propertyData.bathrooms);
    formData.append("furnished", propertyData.furnished);
    formData.append("availableFrom", propertyData.availableFrom.toISOString().split("T")[0]);

    propertyData.amenities.forEach((amenity) => formData.append("amenities", amenity));

    for (let i = 0; i < propertyData.images.length; i++) {
      formData.append("images", propertyData.images[i]); // ✅ No `[]`
    }

    try {
      const response = await axios.post("/addproperties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Add Property</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Title" name="title" fullWidth onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Price" name="price" type="number" fullWidth onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Location" name="location" fullWidth onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="propertyType"
              value={propertyData.propertyType}
              fullWidth
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>Select Property Type</MenuItem>
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              multiple
              name="amenities"
              value={propertyData.amenities}
              fullWidth
              onChange={handleAmenityChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Amenities</MenuItem>
              {amenitiesList.map((amenity) => (
                <MenuItem key={amenity} value={amenity}>{amenity}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Input type="file" inputProps={{ multiple: true }} onChange={handleImageChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>Add Property</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProperty;
