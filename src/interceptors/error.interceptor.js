import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { noAccessToken } from "../config/config";

import githubContext from "../context/githubContext";
import axios from "axios";

const ErrorAxios = ({ children }) => {
  const { t } = useTranslation("common");
  const { setError } = useContext(githubContext);
  const navigate = useNavigate();

  useMemo(() => {
    axios.interceptors.response.use(
      (response) => {
        if (response.data.errors && response.data.errors[0]) {
          setError(response.data.errors[0].message);
        }
        return response;
      },
      (error) => {
        if (error.message === noAccessToken) {
          navigate("/notfound");
        } else {
          setError(t("error.generalerror"));
        }
        return Promise.reject(error);
      }
    );
  }, [setError, t, navigate]);

  return children;
};

export default ErrorAxios;
