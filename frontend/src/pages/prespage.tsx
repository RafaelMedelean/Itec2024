import React from "react";
import Meniu from "../components/presmenu";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/prespage.css";

const App: React.FC = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to /login
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to /signup
  };
  return (
    <div className="background-image">
      <Meniu />
      <div className="centered-container">
        <Card
          className="info-card"
          style={{ background: "rgba(255, 255, 255, 0.8)" }}
        >
          <h1 className="name">Monitoring Apps</h1>
          <div className="button-container">
            <Button
              type="primary"
              size="large"
              onClick={handleLoginClick}
              style={{ marginRight: "10px" }}
            >
              Login
            </Button>
            <Button type="primary" size="large" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;
