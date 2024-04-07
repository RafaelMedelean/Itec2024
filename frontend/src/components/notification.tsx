import { Button, notification, Space } from "antd";
import { useEffect, useState } from "react";
const BugNotification = () => {
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
        if (!response.ok) {
          throw new Error("Failed to fetch bugs");
        }
        const bugsData = await response.json();
        setBugs(bugsData);
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };

    fetchBugs();
  }, []);

  useEffect(() => {
    if (
      bugs.length > 0 &&
      !notification.getInstance().getNotificationByKey("bugAlert")
    ) {
      notification.open({
        key: "bugAlert",
        message: "A apărut Un Bug!",
        description:
          "A apărut un bug în aplicație. Te rog să urmărești tab-ul de Report Bugs pentru a vedea mai multe detalii.",
        duration: 0, // Keep the notification open until manually closed
        btn: (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => notification.close("bugAlert")}
            >
              Confirm
            </Button>
            {/* navigate(0); */}
          </Space>
        ),
      });
    }
  }, [bugs]);

  return null; // This component does not render anything
};

export default BugNotification;
