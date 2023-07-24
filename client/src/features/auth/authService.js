import axios from "axios";

// const url = "http://localhost:3000/api/auth";
const url = "https://webshare-api-v2.onrender.com/api/auth";

const loginUser = async (formData) => {
  const res = await axios.post(`${url}/login`, formData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};
const registerUser = async (formData) => {
  const res = await axios.post(`${url}/register`, formData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logoutUser = async () => {
  localStorage.removeItem("user");
};

const authService = { loginUser, logoutUser, registerUser };
export default authService;
