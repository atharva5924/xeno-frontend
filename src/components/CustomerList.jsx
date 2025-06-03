import React, { useEffect, useState } from "react";
import { Table, Button, Upload, message, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getCustomers, bulkCreateCustomers } from "../api/customers";
import Papa from "papaparse";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csvLoading, setCsvLoading] = useState(false);

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      console.log('Fetched data:', data); // Debug
      setCustomers(data);
    } catch (error) {
      message.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleCsvUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setCsvLoading(true);
        Papa.parse(e.target.result, {
          header: true,
          complete: async (results) => {
            const validCustomers = results.data
              .filter(c => c.name && c.email)
              .map(c => ({
                name: c.name,
                email: c.email,
                phone: c.phone || undefined,
                totalSpent: c.totalSpent ? parseFloat(c.totalSpent) : 0,
                totalOrders: c.totalOrders ? parseInt(c.totalOrders) : 0,
                lastPurchaseDate: c.lastPurchaseDate ? new Date(c.lastPurchaseDate) : undefined,
                firstPurchaseDate: c.firstPurchaseDate ? new Date(c.firstPurchaseDate) : undefined,
                tags: c.tags ? c.tags.split(',').map(t => t.trim()) : []
              }));
            
            await bulkCreateCustomers(validCustomers);
            message.success(`Added ${validCustomers.length} customers`);
            fetchCustomers();
          }
        });
      } catch (error) {
        message.error("Upload failed");
      } finally {
        setCsvLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Phone', 
      dataIndex: 'phone', 
      key: 'phone',
      render: (phone) => phone || 'N/A'
    },
    { 
      title: 'Total Spent', 
      dataIndex: 'totalSpent', 
      key: 'totalSpent',
      render: (amount) => `₹${amount?.toLocaleString() || '0'}`
    },
    { 
      title: 'Total Orders', 
      dataIndex: 'totalOrders', 
      key: 'totalOrders' 
    },
    { 
      title: 'Last Purchase', 
      dataIndex: 'lastPurchaseDate', 
      key: 'lastPurchaseDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'Never'
    },
    { 
      title: 'Tags', 
      dataIndex: 'tags', 
      key: 'tags',
      render: (tags) => tags?.join(', ') || 'None'
    }
  ];

  return (
    <div>
      <Upload
        accept=".csv"
        showUploadList={false}
        beforeUpload={handleCsvUpload}
      >
        <Button icon={<UploadOutlined />} loading={csvLoading}>
          Import CSV
        </Button>
      </Upload>

      <Table
        columns={columns}
        dataSource={customers}
        rowKey="_id"
        loading={loading}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default CustomerList;