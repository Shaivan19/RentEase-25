import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      location: "Mumbai, India",
      price: "₹25,000/month",
      image: "https://source.unsplash.com/400x300/?apartment",
    },
    {
      id: 2,
      title: "Luxury Villa",
      location: "Bangalore, India",
      price: "₹80,000/month",
      image: "https://source.unsplash.com/400x300/?villa",
    },
    {
      id: 3,
      title: "Cozy Studio",
      location: "Pune, India",
      price: "₹15,000/month",
      image: "https://source.unsplash.com/400x300/?studio",
    },
    {
      id: 4,
      title: "Spacious Bungalow",
      location: "Delhi, India",
      price: "₹1,50,000/month",
      image: "https://source.unsplash.com/400x300/?house",
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
        <h2 style={styles.heading}>Featured Properties</h2>
        <div style={styles.grid}>
          {properties.map((property) => (
            <motion.div
              key={property.id}
              style={styles.card}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={property.image} alt={property.title} style={styles.image} />
              <div style={styles.cardContent}>
                <h3>{property.title}</h3>
                <p>{property.location}</p>
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
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    padding: "20px",
  },
  container: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    width: "90%",
    maxWidth: "800px",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px",
  },
  price: {
    fontWeight: "bold",
    color: "#0072ff",
  },
};

export default Home;
