import axios, { AxiosInstance } from "axios";

let instance: AxiosInstance;

if (process.env.NODE_ENV === "development") {
  instance = axios.create();
  instance.defaults.baseURL = process.env.REACT_APP_COURSEMANIA_API;
} else {
  instance = axios.create();
}

export default instance;