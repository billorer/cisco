export const updateParamInURL = (userName) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set("user", userName);
  window.history.replaceState(null, null, "?" + queryParams.toString());
};
