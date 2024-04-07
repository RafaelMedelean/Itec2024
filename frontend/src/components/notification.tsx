// import { Button, notification, Space } from "antd";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const BugNotification = () => {
//   const [bugs, setBugs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBugs = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8001/api/users/bugList",
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch bugs");
//         }
//         const bugsData = await response.json();
//         setBugs(bugsData);
//       } catch (error) {
//         console.error("Error fetching bugs:", error);
//       }
//     };

//     fetchBugs();
//   }, []);

//   useEffect(() => {
//     if (
//       bugs.length > 0 &&
//       !notification.getInstance().getNotificationByKey("bugAlert")
//     ) {
//       notification.open({
//         key: "bugAlert",
//         message: "A apărut Un Bug!",
//         description:
//           "A apărut un bug în aplicație. Te rog să urmărești tab-ul de Report Bugs pentru a vedea mai multe detalii.",
//         duration: 0, // Keep the notification open until manually closed
//         btn: (
//           <Space>
//             <Button
//               type="primary"
//               size="small"
//               onClick={() => navigate("/bug-report")}
//             >
//               View Bugs
//             </Button>
//             <Button
//               type="default"
//               size="small"
//               onClick={() => notification.close("bugAlert")}
//             >
//               Close
//             </Button>
//           </Space>
//         ),
//       });
//     }
//   }, [bugs, navigate]); // Adding navigate to the dependency array to re-run the effect if navigate changes

//   return null; // This component does not render anything
// };

// export default BugNotification;
import { Button, notification, Space } from "antd";

// Variabilă globală pentru a ține evidența dacă notificarea este deschisă
let isNotificationOpen = false;

const closeNotification = () => {
  console.log("Notification was closed.");
  isNotificationOpen = false; // Resetăm indicatorul când notificarea este închisă
};

const showNotification = () => {
  if (isNotificationOpen) {
    // Dacă notificarea este deja deschisă, nu facem nimic
    return;
  }

  const key = `open${Date.now()}`;
  const btn = (
    <Space>
      <Button type="link" size="small" onClick={() => notification.destroy()}>
        Destroy All
      </Button>
      <Button
        type="primary"
        size="small"
        onClick={() => notification.destroy(key)}
      >
        Confirm
      </Button>
    </Space>
  );

  notification.open({
    message: "A aparut Un Bug!",
    description:
      "A aparut un bug in aplicatie, te rog sa urmaresti tab-ul de Report Bugs pentru a vedea mai multe detalii.",
    btn,
    key,
    onClose: closeNotification,
  });

  isNotificationOpen = true; // Setăm indicatorul când deschidem notificarea
};

export default showNotification;
