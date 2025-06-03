import React, { useState } from "react";
import { Button, Card, Modal } from "antd";
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";

const CustomersPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Card
      title="Customers"
      extra={
        <Button type="primary" onClick={showModal}>
          Add Customer
        </Button>
      }
    >
      <CustomerList key={refreshKey} />

      <Modal
        title="Create New Customer"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CustomerForm onSuccess={handleSuccess} />
      </Modal>
    </Card>
  );
};

export default CustomersPage;
