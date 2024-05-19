import axios from "axios";

const apiBase = axios.create({
  baseURL: "https://projeto-fullstack-barbearia.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
apiBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const  endpoint = {
    login: "/auth/login"
}
export default apiBase;
