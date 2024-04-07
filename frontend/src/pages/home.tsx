import React, { useEffect, useState, useRef } from "react";
import Menu from "../components/menu";
import { useNavigate } from "react-router-dom";

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

import { ComputersCanvas } from "../components/canvas";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8001/api/users/current", {
      method: "POST",
      credentials: "include", // Necessary for sessions/cookies to be sent
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Not authenticated on Home page");
      })
      .then((data) => {
        if (!data.user) {
          throw new Error("Not authenticated");
        }
        setIsLoading(false); // User is authenticated
      })
      .catch((error) => {
        console.error("Authentication check failed:", error);
        navigate("/login");
      });
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      < Menu />
      <section style={{ backgroundImage: 'url(herobg.png)', width: '100vw', height: '100vh', margin: 0, padding: 0 }}> 
      <ComputersCanvas />
      </section>
    </div>
  );
};

export default Home;
