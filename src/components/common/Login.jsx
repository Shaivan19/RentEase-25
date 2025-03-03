import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Submitting Login Data:", data);
  
    try {
      const response = await axios.post("/users/login", data);
      console.log("Response from Backend:", response.data);
  
      if (response.status === 200 && response.data?.data?.username) {
        const userData = response.data?.data;
        localStorage.setItem("user",JSON.stringify({
          userId: response.data.data.userId,
    username: response.data.data.username,
        }))
  
//Store user details in localStorage
        // localStorage.setItem("userId", userData._id);                 //used to store userid in local storage 
        // localStorage.setItem("userName", userData.firstName);      //used to store username in local storage
        // localStorage.setItem("userRole", userData.userType);       //used to store usertype in local storage
  
// Toaster Msg
        toast.success(`Welcome ${userData.firstName}!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
  
// Navigate based on user type
        setTimeout(() => {
            navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.error("Login Error:", error);
  
      toast.error(error.response?.data?.message || "Invalid credentials! Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };
  
  

  const styles = {
    pageWrapper: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#F3F4F6",
      top: "0",
      left: "0",
      width:"100vw",
      position: "fixed"

    },
    formContainer: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      backgroundColor: "#16a34a",
      color: "white",
      padding: "12px",
      borderRadius: "6px",
      fontSize: "18px",
      cursor: "pointer",
      border: "none",
      marginTop: "10px",
      transition: "background-color 0.3s",
    },
    errorText: {
      color: "red",
      fontSize: "14px",
      marginTop: "5px",
    },
    registerLink: {
      marginTop: "15px",
      fontSize: "14px",
    },
    registerBtn: {
      color: "#0072ff",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <ToastContainer />

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        style={styles.formContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 style={styles.heading}>Login</h2>

        <label>Email</label>
        <input
          id="email"
          type="email"
          style={styles.input}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}

        <label>Password</label>
        <input
          id="password"
          type="password"
          style={styles.input}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}

        <motion.button
          type="submit"
          style={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>

        <p style={styles.registerLink}>
          New to RentEase?{" "}
          <span onClick={() => navigate("/signup")} style={styles.registerBtn}>
            Register here
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
