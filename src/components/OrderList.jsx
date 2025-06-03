import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import axios from "axios";

const OrderList = ({ refreshTrigger }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Transform data for better display
      const formattedOrders = response.data.map((order) => ({
        ...order,
        key: order._id, // Ant Design requires unique key for each row
        customerName: order.customerId?.name || "Unknown Customer",
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Order fetch error:", error);
      message.error(error.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id.substring(0, 8) + "...",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customer",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₹${amount?.toFixed(2)}`,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => <span>{items?.length || 0} items</span>,
    },
  ];

  return (
    <div>
      <Button
        onClick={fetchOrders}
        loading={loading}
        icon={<RedoOutlined />}
        style={{ marginBottom: 16 }}
      >
        Refresh
      </Button>

      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: loading ? "Loading orders..." : "No orders found",
        }}
      />
    </div>
  );
};

export default OrderList;
