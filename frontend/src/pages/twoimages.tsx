import React, { useEffect, useState } from "react";
import { Button, Form, Input, List, Row, Col } from "antd";
import VirtualList from "rc-virtual-list";
import "./css/twoimage.css"; // Ensure your CSS file path is correct
import { useNavigate } from "react-router-dom";

interface UserItem {
  link: string;
  stat: string;
  username: string;
}

const ContainerHeight = 850;

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

  const [form] = Form.useForm();
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch("http://localhost:8001/api/endpoints/getData", {
        method: "GET",
        credentials: "include", // Necessary for sessions/cookies to be sent
      }) // Update this URL to your actual backend endpoint
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setData(data.concat(body)); // Assuming the body directly contains an array of UserItem objects
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight -
        e.currentTarget.scrollTop -
        ContainerHeight <=
      1
    ) {
      appendData();
    }
  };

  return (
    <Row gutter={16} className="container-row">
      <Col span={24} md={15} className="list-container">
        <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="link" // Using 'link' as a unique identifier for each item
            onScroll={onScroll}
          >
            {(item: UserItem) => (
              <List.Item key={item.link}>
                <List.Item.Meta
                  title={<a href={item.stat}>{item.username}</a>}
                  description={` ${item.link}`}
                />
                <div>{item.stat}</div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
      <Col span={24} md={9} className="form-container">
        <Form form={form} layout="vertical" className="centered-container">
          <Form.Item label="URL">
            <Input size="large" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item label="Endpoint">
            <Input size="large" placeholder="/settings" />
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary">
              Add Endpoint
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default App;
