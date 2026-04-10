// Axios-t létrehozza
import axios from "axios";

// környezeten hozzáadva: a Laravel backenden 8000 porton, féjléc (header): tartalom, fogadás
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}/`,
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
