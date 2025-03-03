import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      location: "Mumbai, India",
      price: "₹25,000/month",
      image: "https://source.unsplash.com/800x400/?apartment",
    },
    {
      id: 2,
      title: "Luxury Villa",
      location: "Bangalore, India",
      price: "₹80,000/month",
      image: "https://source.unsplash.com/800x400/?villa",
    },
    {
      id: 3,
      title: "Cozy Studio",
      location: "Pune, India",
      price: "₹15,000/month",
      image: "https://source.unsplash.com/800x400/?studio",
    },
    {
      id: 4,
      title: "Spacious Bungalow",
      location: "Delhi, India",
      price: "₹1,50,000/month",
      image: "https://source.unsplash.com/800x400/?house",
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.heading}>🏡 Featured Properties</h2>
        <div style={styles.list}>
          {properties.map((property) => (
            <motion.div
              key={property.id}
              style={styles.card}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={property.image} alt={property.title} style={styles.image} />
              <div style={styles.cardContent}>
                <h3 style={styles.title}>{property.title}</h3>
                <p style={styles.location}>{property.location}</p>
                <p style={styles.price}>{property.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    width:"100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    padding: " 20px",
    flexDirection:"column",
    boxSizing:"border-box",

  },
  container: {
    width: "90%", // Take up most of the screen width
    maxWidth: "600px", // Optional max width
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "2px solid #0072ff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s",
    cursor: "pointer",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0072ff",
    marginBottom: "5px",
  },
  location: {
    fontSize: "16px",
    color: "#555",
  },
  price: {
    fontWeight: "bold",
    color: "#0072ff",
    marginTop: "10px",
  },
  grid: {
    display: "flex",
    flexDirection: "column", // Make cards display in a single column
    gap: "15px",
    width: "100%", // Ensure it fills container width
  },
};

export default Home;
