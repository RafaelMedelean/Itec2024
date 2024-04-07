import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReportBug from "../components/ReportBug";

import "./css/dashboard.css";
// import MyAplications from "../components/MyAplications";
import AplicationList from "../components/AplicationList";
import AplicationListUsers from "../components/AplicationListUsers";
import LinkEndpointForm from "../components/formlink";
import Notif from "../components/notification";
import SolveBug from "../components/SolveBug";
import AppMenu from "../components/menu";
import { height, width } from "@mui/system";
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const whiteText = { color: 'white' };
  const items: MenuItem[] = [
    role === true
      ? getItem(<Link to="/dashboard/option1">Add Aplication</Link>, "1")
      : "",
    getItem(<Link to="/dashboard/option2">See List</Link>, "2"),
    role === true
      ? getItem(<Link to="/dashboard/option3">Solve a Bug</Link>, "3")
      : getItem(<Link to="/dashboard/option3">Report a bug</Link>, "3"),
  ]; // Conditionally adding the "Report a bug" option

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
        // console.log  (data.user);
        // console.log("userData" + data.user.isDeveloper);
        // console.log("userData" + data.user.isDeveloper);
        data.user.isDeveloper === true ? Notif() : "";
        // console.log("userData====" + data.user.isDeveloper);
        setRole(data.user.isDeveloper);
        // console.log("rol" + role, role === true);
        setIsLoading(false); // User is authenticated
      })
      .catch((error) => {
        console.error("Authentication check failed:", error);
        // navigate("/login");
      });
  }, [navigate]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const params = useParams();

  return (<>

    <AppMenu/>
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
 

        <div className="demo-logo" />
        < Menu />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            tabIndex={0}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              height: "100vh",
              width: "85.4vw",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundImage: `url("/herobg.png")`,
            }}
          >
            {params.panel === "option1" && (
              <div>
                <div style={{ marginTop: "30vh" }}>
                  {role === true ? <LinkEndpointForm /> : <p>teapa</p>}
                </div>
              </div>
            )}
            {params.panel === "option2" && (
              <div>
                <div style={{ width: "40vw", minHeight: "100vh"  }}>
                  {role === true ? <AplicationList /> : <AplicationListUsers />}
                </div>
              </div>
            )}
            {params.panel === "option3" && (
              <div> {role === true ? <SolveBug /> : <ReportBug />} </div>
            )}
          </Content>
          {/* <Notif /> */}
        </Layout>
      </Layout>
    </Layout>
  </>
  );
};

export default Dashboard;
