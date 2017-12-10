import axios from "axios";
export const BASE_URL = "http://192.168.1.55:3000/";

export const request = () => {
  const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  return axiosApi;
}