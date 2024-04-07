import { Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;
const whiteTextStyle = { color: 'white' };
const BugReportForm = () => {
  const [applications, setApplications] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all applications
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/aplication/getAplicationallNoLogin",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          message.error("Failed to fetch applications");
        }
      } catch (error) {
        message.error("Error fetching applications");
      }
    };

    fetchApplications();
  }, []);

  const onBugReportSubmit = async (values) => {
    console.log("Bug report submitted:", values);

    // Send bug report to backend
    try {
      const response = await fetch(
        "http://localhost:8001/api/aplication/sendBugReport",
      
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
        message.success("Bug report sent successfully!");
        form.resetFields();
        navigate("/dashboard"); // Redirect to dashboard or another page
      } else {
        message.error("Failed to send bug report");
      }
    } catch (error) {
      message.error("Error sending bug report");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", color: 'white'}}>
      <Form
        form={form}
        name="bugReportForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onBugReportSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="application"
          label={<span style={whiteTextStyle}>Application</span>}
          rules={[{ required: true, message: "Please select an application!" }]}
        >
          <Select placeholder="Select an application" style={whiteTextStyle}>
            {applications.map((app) => (
              <Option key={app._id} value={app.link} >
                {app.link}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="details"
          label={<span style={whiteTextStyle}>Bug Details</span>}
          rules={[
            {
              required: true,
              message: "Please provide details about the bug!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={whiteTextStyle}>
            Send Bug Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BugReportForm;
