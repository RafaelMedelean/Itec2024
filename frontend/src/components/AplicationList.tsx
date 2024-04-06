import React, { useEffect, useState } from "react";
import { List, Row, Col } from "antd";
import VirtualList from "rc-virtual-list";
 import "./aplicationList.css"; // Ensure your CSS file path is correct

const ContainerHeight = 850;

const AplicationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Hardcoded URL for user data fetching
  const userDataUrl = "http://localhost:8001/api/endpoints/getData";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(userDataUrl, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const users = await response.json();
        setData(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once on component mount

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={16} className="container-row">
      <Col span={24} className="list-container">
        <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="link" // Adjust according to your data structure
            // onScroll={onScroll}
          >
            {(item) => (
              <List.Item key={item.link}>
                <List.Item.Meta
                  title={<a href={item.stat}>{item.username}</a>}
                  description={item.link}
                />
                <div>{item.stat}</div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
    </Row>
  );
};

export default AplicationList;
