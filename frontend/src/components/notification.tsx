import { notification, Button, Space } from 'antd';

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
      <Button type="primary" size="small" onClick={() => notification.destroy(key)}>
        Confirm
      </Button>
    </Space>
  );

  notification.open({
    message: "A aparut Un Bug!",
    description: 'A aparut un bug in aplicatie, te rog sa urmaresti tab-ul de Report Bugs pentru a vedea mai multe detalii.',
    btn,
    key,
    onClose: closeNotification,
  });

  isNotificationOpen = true; // Setăm indicatorul când deschidem notificarea
};

export default showNotification;
