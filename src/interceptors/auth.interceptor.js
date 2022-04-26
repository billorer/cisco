import axios from "axios";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

axios.interceptors.request.use(
  function (request) {
    request.headers["Content-Type"] = "application/json";
    request.headers["Authorization"] = `bearer ${ACCESS_TOKEN}`;
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
