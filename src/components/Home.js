import React, { Fragment, useContext, useEffect, useState } from "react";
import { Input, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import GithubContext from "../context/githubContext";
import NewRepo from "./NewRepo";

const Home = () => {
  const githubContext = useContext(GithubContext);
  const { user, repos, getCurUserRepoUrl, getRepos, createUserRepo } =
    githubContext;
  const [text, setText] = useState("");
  const rows = repos.reduce((acc, cur) => {
    return [
      ...acc,
      {
        id: cur.id,
        name: cur.name,
        isFork: cur.isFork,
        issueCount: cur.issues.totalCount,
        repoUrl: cur.url,
        pullRequestsCount: cur.pullRequests.totalCount,
        shortDescriptionHTML: cur.shortDescriptionHTML,
        lastCommitDate: cur.object?.history?.nodes[0].committedDate,
      },
    ];
  }, []);

  useEffect(() => {
    getCurUserRepoUrl();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "shortDescriptionHTML",
      headerName: "Short Description",
      width: 150,
    },
    {
      field: "isFork",
      headerName: "Is Fork?",
      width: 90,
    },
    {
      field: "issueCount",
      headerName: "Issues Count",
      width: 150,
    },
    {
      field: "pullRequestsCount",
      headerName: "Pull request Count",
      width: 150,
    },
    {
      field: "lastCommitDate",
      headerName: "Last commit date",
      width: 150,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      getRepos(text);
      updateParamInURL(text);
    }
  };

  const updateParamInURL = (text) => {
    let queryParams = new URLSearchParams(window.location.search);

    // Set new or modify existing page value
    queryParams.set("user", text);

    // Replace current querystring with the new one
    window.history.replaceState(null, null, "?" + queryParams.toString());
  };

  const onChange = (e) => setText(e.target.value);

  const curUserRepo = () => {
    window.open(user.url);
  };

  const createUserRepository = () => {
    createUserRepo(
      "newRepo",
      "description",
      "homepageUrl",
      "PUBLIC",
      user.id,
      true,
      true
    );
  };

  const openRepoUrl = (e) => {
    window.open(e.row.repoUrl);
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit} className="form">
        <Input
          type="text"
          name="text"
          placeholder="Search users..."
          value={text}
          onChange={onChange}
        />
        <Button type="submit">Search</Button>
      </form>
      <Button type="button" onClick={curUserRepo}>
        Go To Repo
      </Button>
      <Button type="button" onClick={createUserRepository}>
        CreateRepository
      </Button>
      <NewRepo></NewRepo>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={openRepoUrl}
        />
      </div>
    </Fragment>
  );
};

export default Home;
