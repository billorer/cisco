import {
  SET_REPOS,
  SET_USER_REPO,
  SET_GITHUB_ERROR,
  SET_LOADING,
} from "./actions";

const githubReducer = (state, action) => {
  switch (action.type) {
    case SET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case SET_USER_REPO:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SET_GITHUB_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
