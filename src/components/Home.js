import React, { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Snackbar, Alert } from "@mui/material";

import GithubContext from "../context/githubContext";
import NewRepo from "./NewRepo";
import Search from "./Search";
import ReposList from "./ReposList";
import Spinner from "./Spinner/Spinner";
import { updateParamInURL } from "../utils/utils";
import { SNACKBAR_AUTOHIDE } from "../config/config";

const Home = () => {
  const { t } = useTranslation("common");
  const githubContext = useContext(GithubContext);
  const { user, getCurUserRepoUrl, getRepos, error, setError, loading } =
    githubContext;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    !user && getCurUserRepoUrl();
  }, [user, getCurUserRepoUrl]);

  const curUserRepo = () => {
    getRepos(user.login);
    updateParamInURL(user.login);
    setUserName(user.login);
  };

  const closeSnackBar = () => {
    setError(null);
  };

  return (
    <Fragment>
      <Search userName={userName} setUserName={setUserName}></Search>
      {userName !== user?.login ? (
        <Button
          type="button"
          onClick={curUserRepo}
          style={{ margin: "0 25px", alignSelf: "right" }}
        >
          {t("home.getCurUserRepos")}
        </Button>
      ) : (
        <Fragment>
          <div
            style={{
              height: 1,
              backgroundColor: "black",
              width: "95%",
              margin: "auto",
            }}
          ></div>
          <NewRepo></NewRepo>
          <div
            style={{
              height: 1,
              backgroundColor: "black",
              width: "95%",
              margin: "auto",
            }}
          ></div>
        </Fragment>
      )}
      {loading ? <Spinner /> : <ReposList />}
      <Snackbar
        autoHideDuration={SNACKBAR_AUTOHIDE}
        open={!!error}
        onClose={closeSnackBar}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Home;
