import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

export const createOrder = async (orderData) => {
  try {
    // Ensure items is properly formatted
    const payload = {
      ...orderData,
      items:
        typeof orderData.items === "string"
          ? JSON.parse(orderData.items)
          : orderData.items,
    };

    const response = await axios.get(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Throw more detailed error
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create order"
    );
  }
};
