import { SET_REPOS, SET_USER_REPO } from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
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

    default:
      return state;
  }
};
