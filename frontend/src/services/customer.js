import axios from "axios";
import { configHeader } from "../utils/helper";

const BASE_URL = "http://localhost:8000/api/v1";
const CUSTOMER_URL = `${BASE_URL}/customers`;
const CUSTOMER_URL_ID = `${BASE_URL}/customers/:id`;



export const getCustomers = async () => {
  const response = await axios.get(CUSTOMER_URL, configHeader());
  return response.data;
};

export const getCustomer = async (id) => {
  const response = await axios.get(CUSTOMER_URL_ID.replace(":id", id), configHeader());
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await axios.post(CUSTOMER_URL, customer, configHeader());
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const response = await axios.put(
    CUSTOMER_URL_ID.replace(":id", id),
    customer,
    configHeader()
  );
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(
    CUSTOMER_URL_ID.replace(":id", id),
    configHeader()
  );
  return response.data;
};

export default {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
