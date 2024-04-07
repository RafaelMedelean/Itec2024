import { Button, List, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SolveBug: React.FC = () => {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/users/bugList",
          {
            method: "GET",
            credentials: "include",
          }
        );
        // console.log("caise");
        if (!response.ok) {
          throw new Error("Failed to fetch bugs");
        }
        const data = await response.json();
        // console.log("mere"); //de ce nu afiseaza nimic
        // console.log(data);
        setBugs(data);
      } catch (error) {
        message.error("Failed to load bugs");
        console.error("Fetch error:", error);
      }
    };

    fetchBugs();
  }, []);

  const handleSolveBug = async (bugId) => {
    try {
      // Replace `your-backend-endpoint` with your actual endpoint for solving bugs
      const response = await fetch(
        `http://localhost:8001/api/users/solve/${encodeURIComponent(bugId)}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          // Send any additional data if needed
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark bug as solved");
      }

      message.success("Bug solved successfully");
      navigate(0);
      // Remove the solved bug from the list or update its status
      setBugs(bugs.filter((bug) => bug.id !== bugId));
    } catch (error) {
      message.error("Failed to solve bug");
      console.error("Solve bug error:", error);
    }
  };

  return (
    <div style={{ color: 'white' }}>
      <h1>Solve Bugs</h1>
      <List
        itemLayout="horizontal"
        dataSource={bugs}
        renderItem={(bug) => (
          <List.Item
            actions={[
              <Button
                key="solve"
                type="primary"
                onClick={() => handleSolveBug(bug.bug)}
                style={{ color: 'white' }}
              >
                Solve
              </Button>,
            ]}
            style={{ color: 'white' }}
          >
            <List.Item.Meta
             title={<span style={{ color: 'white' }}>{`Bug ID: ${bug.bug}`}</span>}
             description={<span style={{ color: 'white' }}>{`Description: ${bug.status}`}</span>}
             style={{ color: 'white' }}
            />
          </List.Item>
        )}
        style={{ color: 'white' }}
      />
    </div>
  );
};

export default SolveBug;
