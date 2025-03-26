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
  Paper,
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const propertyTypes = ["Apartment", "House", "Villa", "Studio", "Commercial"];
const amenitiesList = ["WiFi", "Parking", "Swimming Pool", "Gym", "Security", "Garden"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

  const [previewImages, setPreviewImages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Landlord ID not found. Please log in again.");
      window.location.href = "/login";
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
    
    // Create preview URLs
    const previewUrls = filesArray.map(file => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const removeImage = (index) => {
    const newImages = propertyData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setPropertyData({ ...propertyData, images: newImages });
    setPreviewImages(newPreviews);
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
      formData.append("images", propertyData.images[i]);
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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main", fontWeight: "bold" }}>
          Add New Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Property Title"
                name="title"
                fullWidth
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
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
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: "₹",
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                name="location"
                fullWidth
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                name="propertyType"
                value={propertyData.propertyType}
                fullWidth
                onChange={handleChange}
                displayEmpty
                required
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                <MenuItem value="" disabled>Select Property Type</MenuItem>
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Available From"
                  value={propertyData.availableFrom}
                  onChange={(newValue) => setPropertyData({ ...propertyData, availableFrom: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bedrooms"
                name="bedrooms"
                type="number"
                fullWidth
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bathrooms"
                name="bathrooms"
                type="number"
                fullWidth
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={propertyData.furnished}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Furnished"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                multiple
                name="amenities"
                value={propertyData.amenities}
                fullWidth
                onChange={handleAmenityChange}
                displayEmpty
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                <MenuItem value="" disabled>Select Amenities</MenuItem>
                {amenitiesList.map((amenity) => (
                  <MenuItem key={amenity} value={amenity}>{amenity}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Upload Images
                  <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} accept="image/*" />
                </Button>
                {previewImages.length > 0 && (
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    {previewImages.map((preview, index) => (
                      <Card key={index} sx={{ width: 150, position: "relative" }}>
                        <CardContent sx={{ p: 1 }}>
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{ width: "100%", height: "100px", objectFit: "cover" }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              bgcolor: "rgba(255, 255, 255, 0.8)",
                            }}
                            onClick={() => removeImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                Add Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProperty;
