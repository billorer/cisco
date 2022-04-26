import React, { useReducer } from "react";
import axios from "axios";
import { loader } from "graphql.macro";

import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import { SET_REPOS, SET_USER_REPO, SET_GITHUB_ERROR } from "./actions";
import { GITHUB_URL } from "../config/config";

const GithubState = (props) => {
  const initialState = {
    repos: [],
    loading: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const setError = (error) => {
    dispatch({
      type: SET_GITHUB_ERROR,
      payload: error,
    });
  };

  const createUserRepo = async (
    name,
    description,
    homepageUrl,
    visibility,
    hasIssuesEnabled,
    hasWikiEnabled,
    ownerId
  ) => {
    const createRepositoryQuery = loader("../queries/createRepo.gql").loc.source
      .body;
    await axios.post(GITHUB_URL, {
      query: createRepositoryQuery,
      variables: {
        name,
        description,
        homepageUrl,
        visibility,
        hasIssuesEnabled,
        hasWikiEnabled,
        ownerId,
      },
    });
  };

  const getCurUserRepoUrl = async () => {
    const userQuery = loader("../queries/user.gql").loc.source.body;
    const res = await axios.post(GITHUB_URL, {
      query: userQuery,
    });
    dispatch({
      type: SET_USER_REPO,
      payload: res.data.data.viewer,
    });
  };

  const getRepos = async (username) => {
    const userRepositoriesQuery = loader("../queries/userRepositories.gql").loc
      .source.body;
    const res = await axios.post(GITHUB_URL, {
      query: userRepositoriesQuery,
      variables: {
        login: username,
      },
    });
    dispatch({
      type: SET_REPOS,
      payload: res.data.data?.user?.repositories?.nodes,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        repos: state.repos,
        loading: state.loading,
        user: state.user,
        error: state.error,
        getRepos,
        getCurUserRepoUrl,
        createUserRepo,
        setError,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
