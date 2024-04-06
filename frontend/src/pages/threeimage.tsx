import React, { useState, useEffect } from "react";
import { Layout, Card, Button } from "antd";
import AppMenu from "../components/menu";
const { Header, Content, Footer } = Layout;
import "./css/threeimage.css"; // Importing external CSS
import { useNavigate } from "react-router-dom";
import LinkEndpointForm from "../components/formlink"; // Ensure this is the correct path
import AplicationList from "../components/AplicationList"; // Ensure this is the correct path
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // console.log("Three image page");
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
  }, [isLoading, navigate]);

  return (
    <>
      <AppMenu />
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content className="content">
          <div className="content-wrapper">
            <Card className="image-card">
              <LinkEndpointForm />
            </Card>
            <Card className="text-card">
              <AplicationList/>
            </Card>
          </div>
        </Content>
        <Footer className="footer">
          InteliMed.AI ©{new Date().getFullYear()} Created by InteliMed.AI
        </Footer>
      </Layout>
    </>
  );
};

export default App;
