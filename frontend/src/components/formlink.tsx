import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import useMessage from "./useMessage";

const { Option } = Select;

type ApplicationType = {
  link?: string;
};

type EndpointType = {
  endpoint?: string;
};

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

const LinkEndpointForm: React.FC = () => {
  const [dropdownData, setDropdownData] = useState<string[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<string | undefined>();
  const showMessage = useMessage();
  useEffect(() => {
    const fetchDropdownData = async () => {
      const dropdownDataUrl =
        "http://localhost:8001/api/aplication/getAplication"; 

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

  const onAddApplication = async (values: ApplicationType) => {
    console.log("Adding application:", values);

    try {
      const response = await fetch(
        "http://localhost:8001/api/aplication/sendAplication",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Indicate that you're sending JSON data
          },
          body: JSON.stringify(values), // Convert the JavaScript object to a JSON string
        }
      );

      if (response.ok) {
        // The request was successful, handle the response accordingly
        showMessage("Application added successfully!");
      } else if (response.status === 409) {
        // A 409 Conflict status was returned, handle the conflict
        const errorData = await response.json(); // Assuming the server sends a JSON response with error details
        showMessage(
          errorData.message || "Application already exists for this user",
          "error"
        );
      } else {
        // Some other status was returned, handle it as an error
        showMessage("Failed to add application", "error");
      }
    } catch (error) {
      console.error("Error adding application:", error);
      showMessage("Error adding application", "error");
    }
  };

  const EndpointForm = ({ dropdownData, onAddEndpoint }) => (
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
          onChange={(value) => setSelectedApplication(value)} // Update selectedApplication state on change
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
  );

  const onAddEndpoint = async (values: EndpointType, selectedApplication) => {
    console.log("Adding endpoint:", values);

    // Assuming `values` contains both the selected application and the new endpoint information
    // For example, values might look like: { application: "SelectedApp", endpoint: "NewEndpoint" }

    try {
      const response = await fetch(
        "http://localhost:8001/api/aplication/addEndpoint",
        {
          // Update this URL to your actual endpoint for adding endpoints
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applicationLink: selectedApplication, // The selected application from the dropdown
            endpoint: values.endpoint, // The new endpoint data from the form
          }),
        }
      );

      if (response.ok) {
        // const responseData = await response.json();
        showMessage("Endpoint added successfully!");
        // Optionally, update your state or UI based on the response
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || "Failed to add endpoint", "error");
      }
    } catch (error) {
      console.error("Error adding endpoint:", error);
      showMessage("Error adding endpoint", "error");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <ApplicationForm onAddApplication={onAddApplication} />
      <EndpointForm dropdownData={dropdownData} onAddEndpoint={onAddEndpoint} />
    </div>
  );
};

export default LinkEndpointForm;
