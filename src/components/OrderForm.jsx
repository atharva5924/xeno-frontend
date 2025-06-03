import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, message } from "antd";
import { createOrder } from "../api/order";
import { getCustomers } from "../api/customers";

const { Option } = Select;

const OrderForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        message.error("Failed to fetch customers");
      } finally {
        setCustomerLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const validateJSON = (_, value) => {
    try {
      if (typeof value === "string") {
        JSON.parse(value);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Invalid JSON format"));
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createOrder(values);
      message.success("Order created successfully");
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="customerId"
        label="Customer"
        rules={[{ required: true, message: "Please select a customer" }]}
      >
        <Select
          loading={customerLoading}
          showSearch
          optionFilterProp="children"
          placeholder="Select a customer"
        >
          {customers.map((customer) => (
            <Option key={customer._id} value={customer._id}>
              {customer.name} ({customer.email})
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Order Amount (₹)"
        rules={[{ required: true, message: "Please input order amount" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="items"
        label="Items (JSON format)"
        rules={[
          { required: true, message: "Please input items" },
          { validator: validateJSON },
        ]}
        extra='Example: [{"name":"Product","price":1000,"quantity":2}]'
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
