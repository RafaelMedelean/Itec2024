import React from "react";
import Meniu from "../components/presmenu";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/prespage.css";

import { ComputersCanvas, StarsCanvas } from "../components/canvas";

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
      <ComputersCanvas /> 
      {/* <StarsCanvas />  */}
    </div>
  );
};

export default App;
