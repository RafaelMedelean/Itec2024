import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Dropdown, MenuProps } from "antd";
// import "antd/dist/antd.css"; // Uncomment if Ant Design CSS is not globally imported
import { useNavigate } from "react-router-dom"; // Import useNavigate
const aboutUsMenuItems: MenuProps["items"] = [
  { key: "our-team", label: <Link to="/our-team">Our Team</Link> },
  { key: "faq", label: <Link to="/faq">FAQ</Link> },
  { key: "contact", label: <Link to="/contact">Contact Us</Link> },
];
const { Header } = Layout;

const AppMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to /signup
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to /login
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          zIndex:1
        }}
      >
        <div
          style={{ marginRight: "30px", fontWeight: "bold", fontSize: "25px" , color: "white"}}
        >
          ItecMonitor - Monitoring Apps
        </div>

        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <Button type="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={handleLoginClick}>
                  Login</Button>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </div>
      </Header>
    </Layout>
  );
};

export default AppMenu;
