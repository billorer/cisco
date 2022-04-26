import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";

import { Input, Button } from "@mui/material";

import GithubContext from "../context/githubContext";
import { updateParamInURL } from "../utils/utils";

const Search = ({ userName, setUserName }) => {
  const { t } = useTranslation("common");
  const githubContext = useContext(GithubContext);
  const { getRepos } = githubContext;

  const onSubmit = (e) => {
    e.preventDefault();
    getRepos(userName);
    updateParamInURL(userName);
  };

  const onChange = (e) => setUserName(e.target.value);

  return (
    <Fragment>
      <form onSubmit={onSubmit} className="form">
        <Input
          type="userName"
          name="userName"
          placeholder="Search users..."
          value={userName}
          onChange={onChange}
        />
        <Button type="submit">{t("search.search")}</Button>
      </form>
    </Fragment>
  );
};

export default Search;
