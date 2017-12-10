import axios from "axios";
export const BASE_URL = "http://10.10.40.186:3000";

export const request = () => {
  const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  return axiosApi;
}