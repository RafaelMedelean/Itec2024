import { Col, List, Row } from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import "./css/aplicationList.css";
import CustomLineChart from "./CustomLineChart";

const ContainerHeight = 650;

const AplicationListUsers = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const userDataUrl = "http://localhost:8001/api/aplication/getAplicationallNoLogin";

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

  useEffect(() => {
    console.log({ selectedEndpoint });
  }, [selectedEndpoint]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={15} className="container-row">
      <Col span={12} className="list-container">
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
                      <List.Item
                        key={endpoint.endpoint}
                        onClick={() => setSelectedEndpoint(endpoint)}
                      >
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

      {selectedEndpoint && (
        <Col span={12} className="graph-container">
          <CustomLineChart
            data={selectedEndpoint.states.map((h, index) => ({
              code: h,
              time: selectedEndpoint.history[index].time,
            }))}
          />
        </Col>
      )}
    </Row>
  );
};

export default AplicationListUsers;
