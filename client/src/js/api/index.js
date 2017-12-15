import axios from "axios";
// export const BASE_URL = "http://192.168.1.34:3000";
export const BASE_URL = "https://quiet-fortress-22465.herokuapp.com";


export const request = () => {
  const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });
  return axiosApi;
}

export const NameFaculty = {
  1: "Công nghệ thông tin",
  2: "Cơ điện tử",
  3: "Cơ khí",
  4: "Môi trường",
  5: "Điện tử viễn thông",
  6: "Linh tinh",
}