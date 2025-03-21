import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  TextField, Button, Radio, RadioGroup, FormControlLabel, Card, Box, Typography, InputAdornment, Divider 
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password", "");
  const [userType, setUserType] = useState("tenant");
  const [phone, setPhone] = useState("");

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      userType: userType.toLowerCase(),
      email: data.email,
      password: data.password,
      phone: phone,
    };

    try {
      const response = await axios.post("/users/signup", userData);
      if (response.status === 201) {
        alert("Signup Successful! Redirecting to Login...");
        navigate("/login");
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("🔥 Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error during signup. Please try again.");
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card sx={styles.formContainer}>
          <Typography variant="h5" sx={styles.heading}>Create Your Account</Typography>

          {/* User Type Selection */}
          <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
            <FormControlLabel value="tenant" control={<Radio color="primary" />} label="Tenant" />
            <FormControlLabel value="landlord" control={<Radio color="primary" />} label="Landlord" />
          </RadioGroup>

          {/* Form Fields */}
          <TextField 
            label="Username" 
            fullWidth 
            variant="outlined" 
            margin="normal"
            InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>) }}
            {...register("username", { required: "Username is required" })} 
            error={!!errors.username} 
            helperText={errors.username?.message}
          />

          <TextField 
            label="Email" 
            type="email" 
            fullWidth 
            variant="outlined" 
            margin="normal"
            InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }}
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} 
            error={!!errors.email} 
            helperText={errors.email?.message}
          />

          <MuiTelInput 
            label="Phone Number"
            fullWidth
            defaultCountry="IN"
            value={phone}
            onChange={setPhone}
            sx={{ marginY: 2 }}
            InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon /></InputAdornment>) }}
          />

          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            variant="outlined" 
            margin="normal"
            InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }}
            {...register("password", { required: "Password is required" })} 
            error={!!errors.password} 
            helperText={errors.password?.message}
          />

          <TextField 
            label="Confirm Password" 
            type="password" 
            fullWidth 
            variant="outlined" 
            margin="normal"
            InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            })} 
            error={!!errors.confirmPassword} 
            helperText={errors.confirmPassword?.message}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit(onSubmit)}
              sx={styles.button}
            >
              Sign Up
            </Button>
          </motion.div>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* Google Signup */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={styles.googleButton}
              startIcon={<GoogleIcon />}
              onClick={() => alert("Google Signup Coming Soon!")}
            >
              Sign Up with Google
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </Box>
  );
};

// Styles
const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: "url('https://github.com/Shaivan19/mybackgrounds/blob/main/webbackground_optimized.png?raw=true')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    width: "90%",
    maxWidth: "450px",
    minHeight:"fit-content",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency for better contrast
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  button: {
    marginTop: "15px",
  },
  googleButton: {
    borderColor: "#DB4437",
    color: "#DB4437",
    "&:hover": {
      backgroundColor: "rgba(219, 68, 55, 0.1)",
    },
  },
};

export default Signup;
