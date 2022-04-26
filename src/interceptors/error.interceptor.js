import { useContext, useMemo } from "react";

import githubContext from "../context/githubContext";
import axios from "axios";

const ErrorAxios = ({ children }) => {
  const { setError } = useContext(githubContext);
  useMemo(() => {
    axios.interceptors.response.use(function (response) {
      if (response.data.errors && response.data.errors[0]) {
        setError(response.data.errors[0].message);
      }
      return response;
    });
  }, [setError]);

  return children;
};

export default ErrorAxios;
