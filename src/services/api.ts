// Axios-t létrehozza
import axios from "axios";

const baseUrl: string =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:8000/api";

// környezeten hozzáadva: a Laravel backenden 8000 porton, féjléc (header): tartalom, fogadás
const instance = axios.create({
  baseURL: `${baseUrl}/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
