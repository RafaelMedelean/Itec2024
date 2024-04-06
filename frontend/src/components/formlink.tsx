import React from "react";
import { Button, Form, Input } from "antd";

type FieldType = {
  link?: string;
  endpoint?: string;
};

const onFinish = async (values: FieldType) => {
  console.log("Success:", values);

  // Specify the backend endpoint URL
  const backendUrl = "http://localhost:8001/api/endpoints/sendData"; // Replace with your actual backend endpoint

  try {
    const response = await fetch(backendUrl, {
      method: "POST", // or 'PUT', depending on your backend requirements
      credentials: "include", // Necessary for sessions/cookies to be sent
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // Convert the form values into a JSON string
    });

    if (response.ok) {
    //  const data = await response.json(); // Assuming the backend responds with JSON
     // console.log("Response data:", data);
      // Handle successful submission here (e.g., show success message, redirect, etc.)
    } else {
      console.error("Submission failed:", response.statusText);
      // Handle submission failure here (e.g., show error message to the user)
    }
  } catch (error) {
    console.error("Error during submission:", error);
    // Handle network or other errors here (e.g., show error message to the user)
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const LinkEndpointForm: React.FC = () => (
  <Form
    name="linkEndpointForm"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    style={{ maxWidth: 600, margin: "auto" }} // Centering the form
  >
    <Form.Item label="Link" name="link" rules={[{ required: false }]}>
      <Input />
    </Form.Item>

    <Form.Item label="Endpoint" name="endpoint" rules={[{ required: false }]}>
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form.Item>
  </Form>
);

export default LinkEndpointForm;
