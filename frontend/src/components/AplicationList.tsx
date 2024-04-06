import React, { useEffect, useState } from "react";
import { List, Row, Col } from "antd";
import VirtualList from "rc-virtual-list";
import "./aplicationList.css";

const ContainerHeight = 500;

const AplicationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const userDataUrl = "http://localhost:8001/api/aplication/getAplicationall";

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
        const applications = await response.json();
        setData(applications);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
            itemKey="link"
          >
            {(application) => (
              <List.Item key={application.link}>
                <List.Item.Meta
                  title={<a href={application.link}>{application.link}</a>}
                  description={`Status: ${application.status}`}
                />
                <div>
                  Endpoints:
                  <List
                    size="small"
                    dataSource={application.endpoints}
                    renderItem={(endpoint) => (
                      <List.Item key={endpoint.endpoint}>
                        {endpoint.endpoint} - {endpoint.stat}
                      </List.Item>
                    )}
                  />
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
    </Row>
  );
};

export default AplicationList;
