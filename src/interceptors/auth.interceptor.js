import axios from "axios";
import { noAccessToken } from "../config/config";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

axios.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";

    if (ACCESS_TOKEN) {
      request.headers["Authorization"] = `bearer ${ACCESS_TOKEN}`;
      return request;
    } else {
      throw new axios.Cancel(noAccessToken);
    }
  },
  (error) => Promise.reject(error)
);
