import React, { Fragment, useContext, useEffect, useState } from "react";

import { Button, Snackbar, Alert } from "@mui/material";

import GithubContext from "../context/githubContext";
import NewRepo from "./NewRepo";
import Search from "./Search";
import ReposList from "./ReposList";
import { updateParamInURL } from "../utils/utils";

const Home = () => {
  const githubContext = useContext(GithubContext);
  const { user, getCurUserRepoUrl, getRepos, error, setError } = githubContext;
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
        <Button type="button" onClick={curUserRepo} style={{ margin: "25px" }}>
          Get Current User Repos
        </Button>
      ) : (
        <NewRepo></NewRepo>
      )}
      <ReposList></ReposList>
      <Snackbar autoHideDuration={5000} open={!!error} onClose={closeSnackBar}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Home;
