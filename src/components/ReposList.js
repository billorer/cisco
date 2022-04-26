import React, { useContext } from "react";

import { DataGrid } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import GithubContext from "../context/githubContext";

const ReposList = () => {
  const githubContext = useContext(GithubContext);
  const { repos } = githubContext;

  const getFormattedDate = (param) => {
    return param && new Intl.DateTimeFormat("en-US").format(new Date(param));
  };
  const rows = repos
    ? repos.reduce((acc, cur) => {
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
            lastCommitDate: getFormattedDate(
              cur.object?.history?.nodes[0].committedDate
            ),
          },
        ];
      }, [])
    : [];

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
      renderCell: (params) =>
        params ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>,
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

  const openRepoUrl = (e) => {
    window.open(e.row.repoUrl);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={openRepoUrl}
      />
    </div>
  );
};

export default ReposList;
