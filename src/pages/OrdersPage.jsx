import React, { useState } from "react";
import { Button, Card, Modal, message, Spin } from "antd";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

const OrdersPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSuccess = () => {
    message.success("Order created successfully!");
    setIsModalVisible(false);
    setRefreshTrigger((prev) => !prev); // Toggle to trigger refresh
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await handleSuccess(values);
    } catch (error) {
      message.error("Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title="Orders"
      extra={
        <Button type="primary" onClick={showModal} disabled={isSubmitting}>
          {isSubmitting ? <Spin size="small" /> : "Create Order"}
        </Button>
      }
    >
      <OrderList
        refreshTrigger={refreshTrigger}
        onOrderCreated={handleSuccess}
      />

      <Modal
        title="Create New Order"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
        maskClosable={!isSubmitting}
        closable={!isSubmitting}
      >
        <OrderForm
          onSuccess={handleFormSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </Card>
  );
};

export default OrdersPage;
