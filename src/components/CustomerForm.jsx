import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, message, InputNumber,Tag } from "antd";
import { createCustomer } from "../api/customers";

const { Option } = Select;

const CustomerForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Format dates and prepare data
      const customerData = {
        ...values,
        lastPurchaseDate: values.lastPurchaseDate?.toISOString(),
        firstPurchaseDate: values.firstPurchaseDate?.toISOString(),
        tags: tags,
      };

      await createCustomer(customerData);
      message.success("Customer created successfully");
      form.resetFields();
      setTags([]);
      onSuccess && onSuccess();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create customer"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTagAdd = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  const handleTagRemove = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: "Please input customer name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input customer email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          { pattern: /^[0-9]+$/, message: "Please enter valid phone number" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="totalSpent" label="Total Spent (₹)" initialValue={0}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="totalOrders" label="Total Orders" initialValue={0}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="lastPurchaseDate" label="Last Purchase Date">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="firstPurchaseDate" label="First Purchase Date">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Tags">
        <div style={{ marginBottom: 8 }}>
          <Input
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onPressEnter={handleTagAdd}
            style={{ width: "60%", marginRight: 8 }}
            placeholder="Add tag"
          />
          <Button onClick={handleTagAdd}>Add Tag</Button>
        </div>
        <div>
          {tags.map((tag) => (
            <Tag
              key={tag}
              closable
              onClose={() => handleTagRemove(tag)}
              style={{ marginBottom: 4 }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Customer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
