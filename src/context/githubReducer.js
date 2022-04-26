import { SET_REPOS, SET_USER_REPO, SET_GITHUB_ERROR } from "./actions";

const githubReducer = (state, action) => {
  switch (action.type) {
    case SET_REPOS:
      return {
        ...state,
        repos: action.payload,
      };
    case SET_USER_REPO:
      return {
        ...state,
        user: action.payload,
      };
    case SET_GITHUB_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default githubReducer;
