import axios from "axios";

const BASE_LOGIN_URL = "http://localhost:8000/api/v1/login";
const BASE_USER_URL = "http://localhost:8000/api/v1/users";

const config = {
    headers: {
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
  }}

export const login = async (user) => {
  const response = await axios.post(BASE_LOGIN_URL, user, config);
  return response.data;
};

export const signup = async (user) => {
  const response = await axios.post(BASE_USER_URL, user, config);
  return response.data;
};

export default { login, signup };
