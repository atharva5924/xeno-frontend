import axios from "axios";

const API_URL = "http://localhost:3000/api/customers";

export const getCustomers = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
export const createCustomer = async (customerData) => {
  const response = await axios.post(API_URL, customerData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const bulkCreateCustomers = async (customersArray) => {
  const response = await axios.post(`${API_URL}/bulk`, customersArray, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
