import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, TextField, Button, Box, Typography, Paper } from "@mui/material";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onSubmit = async (data) => {
    console.log("Submitting Login Data:", data);
    
    try {
      const response = await fetch('http://localhost:1906/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('userId', data.data.userId);

        toast.success(`Welcome ${data.data.username}!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        setTimeout(() => {
          // Redirect based on user type
          if (data.userType === 'Tenant') {
            navigate('/tenant/dashboard');
          } else if (data.userType === 'Landlord') {
            navigate('/landlord/dashboard');
          } else if (data.userType === 'Admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/home');
          }
        }, 2000);
      } else {
        console.error('Login error:', data.message);
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error during login. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://github.com/Shaivan19/mybackgrounds/blob/main/webbackground_optimized.png?raw=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        paddingTop: "80px",
      }}
    >
      <ToastContainer />
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            borderRadius: 4,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.9)",
            width: "400px",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Typography
              variant="body2"
              sx={{ textAlign: "right", mt: 1, cursor: "pointer", color: "#0072ff" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, backgroundColor: "#16a34a", "&:hover": { backgroundColor: "#128c3c" }, fontSize: "18px", padding: "12px" }}
              >
                Login
              </Button>
            </motion.div>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            New to RentEase?{' '}
            <motion.span
              style={{ color: "#0072ff", cursor: "pointer", fontWeight: "bold" }}
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/signup")}
            >
              Register here
            </motion.span>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;