// import React from "react";
// import { motion } from "framer-motion";

// const Home = () => {
//   const properties = [
//     {
//       id: 1,
//       title: "Modern Apartment",
//       location: "Mumbai, India",
//       price: "₹25,000/month",
//       image: "https://source.unsplash.com/800x400/?apartment",
//     },
//     {
//       id: 2,
//       title: "Luxury Villa",
//       location: "Bangalore, India",
//       price: "₹80,000/month",
//       image: "https://source.unsplash.com/800x400/?villa",
//     },
//     {
//       id: 3,
//       title: "Cozy Studio",
//       location: "Pune, India",
//       price: "₹15,000/month",
//       image: "https://source.unsplash.com/800x400/?studio",
//     },
//     {
//       id: 4,
//       title: "Spacious Bungalow",
//       location: "Delhi, India",
//       price: "₹1,50,000/month",
//       image: "https://source.unsplash.com/800x400/?house",
//     },
//   ];

//   return (
//     <div style={styles.pageWrapper}>
//       <motion.div
//         style={styles.container}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 style={styles.heading}>🏡 Featured Properties</h2>
//         <div style={styles.list}>
//           {properties.map((property) => (
//             <motion.div
//               key={property.id}
//               style={styles.card}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <img src={property.image} alt={property.title} style={styles.image} />
//               <div style={styles.cardContent}>
//                 <h3 style={styles.title}>{property.title}</h3>
//                 <p style={styles.location}>{property.location}</p>
//                 <p style={styles.price}>{property.price}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: {
//     minHeight: "100vh",
//     width:"100vw",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#F3F4F6",
//     padding: " 20px",
//     flexDirection:"column",
//     boxSizing:"border-box",

//   },
//   container: {
//     width: "90%",
//     maxWidth: "600px",
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
//     textAlign: "center",
//   },
//   heading: {
//     fontSize: "28px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//     color: "#333",
//   },
//   list: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     border: "2px solid #0072ff",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//     transition: "transform 0.3s",
//     cursor: "pointer",
//     textAlign: "left",
//   },
//   image: {
//     width: "100%",
//     height: "200px",
//     objectFit: "cover",
//   },
//   cardContent: {
//     padding: "15px",
//   },
//   title: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#0072ff",
//     marginBottom: "5px",
//   },
//   location: {
//     fontSize: "16px",
//     color: "#555",
//   },
//   price: {
//     fontWeight: "bold",
//     color: "#0072ff",
//     marginTop: "10px",
//   },
//   grid: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     width: "100%",
//   },
// };

// export default Home;


import React from "react";
import { motion } from "framer-motion";
import { Grid, Card, CardMedia, CardContent, Typography, Container } from "@mui/material";

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
    <Container
      maxWidth="lg"
      sx={{ 
        mt: 10, 
        textAlign: "center", 
        backgroundColor: "#f9f9f9", 
        minHeight: "100vh", 
        paddingBottom: "40px",
        borderRadius: 2
      }}
    >
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🏡 Featured Properties
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={3} key={property.id}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardMedia component="img" height="200" image={property.image} alt={property.title} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.location}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary" mt={1}>
                      {property.price}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Home;
