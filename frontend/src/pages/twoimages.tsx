//import * as React from 'react';
import React, { useState, useEffect } from "react";
import { Layout, Card, Button } from "antd";
import CustomLineChart from '../components/CustomLineChart';
import AppMenu from "../components/menu";
import SidebarReact from "../components/SidebarReact";
const { Header, Content, Footer } = Layout;
import "./css/threeimage.css";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({ xAxis: [], yAxis: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8001/api/users/current", {
      method: "POST",
      credentials: "include", 
    })
      .then((response) => {
        if (response.ok) 
        {
          return response.json();
        }
        throw new Error("Not authenticated on Home page");
      })
      .then((data) => 
      {
        if (!data.user) {
          throw new Error("Not authenticated");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Authentication check failed:", error);
        navigate("/login");
      });

      const fetchData = async () => {
        try {
          const response = await fetch("https://myendpoint.free.beeceptor.com/graph");
          const yAxisData = await response.json(); // Assuming this directly returns the yAxis array
          console.log('Received yAxisData:', yAxisData);
          // Generate xAxis array based on the length of yAxisData
          const xAxisData = yAxisData.map((_, index) => index);
          
          // Update chartData state with both xAxis and yAxis
          setChartData({
            xAxis: xAxisData,
            yAxis: yAxisData,
          });
        } catch (error) {
          console.error("Failed to fetch chart data:", error);
        }
      };
      

      fetchData();

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
              <SidebarReact role={'user'}/>
            </Card>
            <Card className="text-card">
              <CustomLineChart data={chartData} />
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
