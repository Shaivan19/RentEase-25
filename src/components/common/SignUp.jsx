import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; 

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password", "");
  const [userType, setUserType] = useState("tenant");

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      userType: userType.toLowerCase(), // Ensuring it's in lowercase
      email: data.email,
      password: data.password
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
    <div style={styles.pageWrapper}>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        style={styles.formContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.heading}>Create Your Account</h2>

        {/* User Type Selection */}
        <div style={styles.radioContainer}>
          <label>
            <input
              type="radio"
              value="tenant"
              checked={userType === "tenant"}
              onChange={() => setUserType("tenant")}
            />
            Tenant
          </label>
          <label>
            <input
              type="radio"
              value="landlord"
              checked={userType === "landlord"}
              onChange={() => setUserType("landlord")}
            />
            Landlord
          </label>
        </div>

        {/* Username */}
        <motion.input
          placeholder="Enter Username"
          type="text"
          style={styles.input}
          {...register("username", { required: "Username is required" })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.username && <p style={styles.errorText}>{errors.username.message}</p>}

        {/* Email */}
        <motion.input
          placeholder="Enter Email"
          type="email"
          style={styles.input}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}

        {/* Password */}
        <motion.input
          placeholder="Create Password"
          type="password"
          style={styles.input}
          {...register("password", { required: "Password is required" })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}

        {/* Confirm Password */}
        <motion.input
          placeholder="Re-enter Password"
          type="password"
          style={styles.input}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          whileFocus={{ scale: 1.05 }}
        />
        {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword.message}</p>}

        <motion.button
          type="submit"
          style={styles.button}
          whileHover={{ scale: 1.05 }}
        >
          Sign Up
        </motion.button>
      </motion.form>
    </div>
  );
};

const styles = {
  pageWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F3F4F6",
    zIndex: 9999,
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    backgroundColor: "#0072ff",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  },
  radioContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "12px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default Signup;
