import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../bg.jpg";

const Home = () => {
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    title: {
      marginBottom: "10px",
      color: "black",
      textAlign: "center",
    },
    button: {
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Home</h2>
      <button data-testid="student-btn" style={styles.button}>
        <Link to="/student" style={{ color: "white" }}>
          All Student
        </Link>
      </button>
    </div>
  );
};

export default Home;
