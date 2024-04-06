import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import useMessage from "./useMessage";

const { Option } = Select;

const ApplicationForm = ({ onAddApplication }) => (
  <Form
    name="applicationForm"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    onFinish={onAddApplication}
    autoComplete="off"
  >
    <Form.Item
      label="Application"
      name="link"
      rules={[
        { required: true, message: "Please input the application name!" },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Add Application
      </Button>
    </Form.Item>
  </Form>
);

const LinkEndpointForm = () => {
  const [dropdownData, setDropdownData] = useState<string[]>([]);

  const [selectedApplication, setSelectedApplication] = useState<string | undefined>();

  const showMessage = useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDropdownData = async () => {
      const dropdownDataUrl = "http://localhost:8001/api/aplication/getAplication"; 

      try {
        const response = await fetch(dropdownDataUrl, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setDropdownData(data);
        } else {
          console.error("Failed to fetch dropdown data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const onAddApplication = async (values) => {
    console.log("Adding application:", values);

    try {
      const response = await fetch(
        "http://localhost:8001/api/aplication/sendAplication",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        showMessage("Application added successfully!");
        navigate(0);
      } else if (response.status === 409) {
        const errorData = await response.json();
        showMessage(
          errorData.message || "Application already exists for this user",
          "error"
        );
      } else {
        showMessage("Failed to add application", "error");
      }
    } catch (error) {
      console.error("Error adding application:", error);
      showMessage("Error adding application", "error");
    }
  };

  const onAddEndpoint = async (values) => {
    console.log("Adding endpoint:", values);

    if (!selectedApplication) {
      showMessage("No application selected", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8001/api/aplication/addEndpoint",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applicationLink: selectedApplication,
            endpoint: values.endpoint,
          }),
        }
      );

      if (response.ok) {
        showMessage("Endpoint added successfully!");
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || "Failed to add endpoint", "error");
      }
    } catch (error) {
      console.error("Error adding endpoint:", error);
      showMessage("Error adding endpoint", "error");
    }
    navigate(0);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <ApplicationForm onAddApplication={onAddApplication} />
      <Form
        name="endpointForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onAddEndpoint}
        autoComplete="off"
      >
        <Form.Item
          label="Application"
          name="application"
          rules={[{ required: true, message: "Please select an application!" }]}
        >
          <Select
            placeholder="Select an application"
            onChange={(value) => setSelectedApplication(value)}
          >
            {dropdownData.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="New Endpoint"
          name="endpoint"
          rules={[{ required: true, message: "Please input the endpoint!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Endpoint
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LinkEndpointForm;
