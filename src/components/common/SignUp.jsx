import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  TextField, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Card, 
  Box, 
  Typography, 
  InputAdornment, 
  Divider,
  IconButton,
  FormControl,
  FormLabel,
  useTheme,
  CircularProgress
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";

const Signup = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const password = watch("password", "");
  const [userType, setUserType] = useState("tenant");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
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
        toast.success("Signup Successful! Redirecting to Login...", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        
        // Store minimal signup data for pre-filling login fields (optional)
        sessionStorage.setItem("signupData", JSON.stringify({
          email: userData.email,
          userType: userData.userType
        }));
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Signup failed", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("🔥 Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error during signup. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme?.spacing?.(4) || 32,
    borderRadius: "16px",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    textAlign: "center",
    backgroundColor: theme?.palette?.background?.paper || '#ffffff',
    border: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
    margin: '16px',
    zIndex: 10,
    '@media (max-width: 600px)': {
      padding: theme?.spacing?.(2) || 16,
      maxWidth: "90%",
      maxHeight: "calc(100vh - 100px)",
    },
  }));

  return (
    <Box 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: "url('https://github.com/Shaivan19/mybackgrounds/blob/main/webbackground_optimized.png?raw=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 0,
        paddingTop: { xs: '70px', sm: '80px' },
        boxSizing: 'border-box',
        margin: 0
      }}
    >
      <ToastContainer />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          padding: '0 16px',
          position: 'relative',
          zIndex: 5
        }}
      >
        <StyledCard>
          <Typography variant="h4" sx={{ ...styles.heading, color: theme?.palette?.primary?.main || '#1976d2' }}>
            Join RentEase
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create your account to get started
          </Typography>

          {/* User Type Selection */}
          <FormControl component="fieldset" sx={{ mb: { xs: 2, sm: 3 }, width: '100%' }}>
            <FormLabel component="legend" sx={{ textAlign: 'left', mb: 1 }}>
              I am a:
            </FormLabel>
            <RadioGroup 
              row 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
              sx={{ justifyContent: 'space-between' }}
            >
              <FormControlLabel 
                value="tenant" 
                control={<Radio color="primary" />} 
                label="Tenant" 
                sx={{
                  flex: 1,
                  border: userType === 'tenant' ? `2px solid ${theme?.palette?.primary?.main || '#1976d2'}` : '2px solid transparent',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  mr: 1
                }}
              />
              <FormControlLabel 
                value="landlord" 
                control={<Radio color="primary" />} 
                label="Landlord" 
                sx={{
                  flex: 1,
                  border: userType === 'landlord' ? `2px solid ${theme?.palette?.primary?.main || '#1976d2'}` : '2px solid transparent',
                  borderRadius: '8px',
                  padding: '8px 16px'
                }}
              />
            </RadioGroup>
          </FormControl>

          {/* Form Fields */}
          <Box sx={{ overflowY: 'auto' }}>
            <TextField 
              label="Username" 
              fullWidth 
              variant="outlined" 
              margin="normal"
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
              }}
              {...register("username", { required: "Username is required" })} 
              error={!!errors.username} 
              helperText={errors.username?.message}
              sx={{ mb: { xs: 1.5, sm: 2 } }}
            />

            <TextField 
              label="Email" 
              type="email" 
              fullWidth 
              variant="outlined" 
              margin="normal"
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
              }}
              {...register("email", { 
                required: "Email is required", 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: "Invalid email address" 
                } 
              })} 
              error={!!errors.email} 
              helperText={errors.email?.message}
              sx={{ mb: { xs: 1.5, sm: 2 } }}
            />

            <MuiTelInput 
              label="Phone Number"
              fullWidth
              defaultCountry="IN"
              value={phone}
              onChange={setPhone}
              sx={{ mb: 2 }}
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
              }}
            />

            <TextField 
              label="Password" 
              type={showPassword ? "text" : "password"} 
              fullWidth 
              variant="outlined" 
              margin="normal"
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
              }}
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })} 
              error={!!errors.password} 
              helperText={errors.password?.message}
              sx={{ mb: 2 }}
            />

            <TextField 
              label="Confirm Password" 
              type={showConfirmPassword ? "text" : "password"} 
              fullWidth 
              variant="outlined" 
              margin="normal"
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
              }}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match"
              })} 
              error={!!errors.confirmPassword} 
              helperText={errors.confirmPassword?.message}
              sx={{ mb: 3 }}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                sx={{
                  mt: 1,
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }}
                size="large"
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </Button>
            </motion.div>

            <Divider sx={{ my: { xs: 2, sm: 3 } }}>
              <Typography variant="body2" color="text.secondary">
                OR CONTINUE WITH
              </Typography>
            </Divider>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: theme?.palette?.divider || '#e0e0e0',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme?.palette?.divider || '#e0e0e0',
                    backgroundColor: theme?.palette?.action?.hover || '#f5f5f5'
                  }
                }}
                startIcon={<GoogleIcon />}
                onClick={() => toast.info("Google Signup Coming Soon!", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "colored",
                })}
                size="large"
              >
                Google
              </Button>
            </motion.div>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Box 
              component="span" 
              sx={{ 
                cursor: 'pointer', 
                fontWeight: 'bold',
                color: theme?.palette?.primary?.main || '#1976d2',
                '&:hover': { textDecoration: 'underline' } 
              }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </Box>
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            By signing up, you agree to our{' '}
            <Typography 
              variant="caption" 
              sx={{ 
                cursor: 'pointer', 
                color: theme?.palette?.primary?.main || '#1976d2',
                '&:hover': { textDecoration: 'underline' } 
              }}
              onClick={() => navigate("/terms")}
            >
              Terms & Conditions
            </Typography>
          </Typography>

          <Box 
            sx={{
              mt: 2,
              pt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid',
              borderColor: theme?.palette?.divider || '#e0e0e0',
              '&:hover': {
                borderColor: theme?.palette?.divider || '#e0e0e0',
                backgroundColor: theme?.palette?.action?.hover || '#f5f5f5'
              }
            }}
          >
          </Box>
        </StyledCard>
      </motion.div>
    </Box>
  );
};

const styles = {
  heading: {
    fontWeight: 700,
    mb: 1,
  },
};

export default Signup;