import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import { SET_REPOS, SET_USER_REPO } from "./types";

const GithubState = (props) => {
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  const initialState = {
    repos: [],
    loading: false,
    user: null,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const createUserRepo = async (
    name,
    description,
    homepageUrl,
    visibility,
    hasIssuesEnabled,
    hasWikiEnabled,
    userId
  ) => {
    const res = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `
          mutation {
            createRepository(input: {name: "${name}", description: "${description}", homepageUrl: "${homepageUrl}", visibility: ${visibility}, ownerId: "${userId}", hasIssuesEnabled: ${hasIssuesEnabled}, hasWikiEnabled: ${hasWikiEnabled}}) {
              repository {
                url
              }
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log("NEW USER: ", res);
  };
  const getCurUserRepoUrl = async () => {
    const res = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `{
          viewer {
            id
            url
          }
        }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    dispatch({
      type: SET_USER_REPO,
      payload: res.data.data.viewer,
    });
  };
  const getRepos = async (username) => {
    const res = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `{
          user(login: "${username}") {
            repositories(first:50) {
              nodes {
                id
                name
                isFork
                url
                shortDescriptionHTML
                object(expression: "master") {
                  ... on Commit {
                    history(first: 1) {
                      nodes {
                        committedDate
                      }
                    }
                  }
                }
                issues {
                  totalCount
                }
                pullRequests {
                  totalCount
                }
              }
            }
          }
        }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    dispatch({
      type: SET_REPOS,
      payload: res.data.data.user.repositories.nodes,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        repos: state.repos,
        loading: state.loading,
        user: state.user,
        getRepos,
        getCurUserRepoUrl,
        createUserRepo,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
