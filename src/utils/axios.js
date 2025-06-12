import axiosClient from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = axiosClient.create({
  baseURL: "https://api.crassus.app.br/",
});

axios.interceptors.request.use(
  async (config) => {
    const raw = await AsyncStorage.getItem("token");
    let token = "";

    try {
      token = raw ? JSON.parse(raw) : "";
    } catch {
      token = "";
    }

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
