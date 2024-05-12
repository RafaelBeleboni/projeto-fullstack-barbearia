import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://192.168.15.8:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export const  endpoint = {
    login: "/auth/login"
}
export default apiBase;
