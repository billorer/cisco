import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { DataGrid } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import GithubContext from "../context/githubContext";

const ReposList = () => {
  const { t } = useTranslation("common");
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
      headerName: t("reposList.name"),
      width: 150,
    },
    {
      field: "shortDescriptionHTML",
      headerName: t("reposList.shortdescription"),
      width: 150,
    },
    {
      field: "isFork",
      headerName: t("reposList.isfork"),
      width: 90,
      renderCell: (params) =>
        params ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>,
    },
    {
      field: "issueCount",
      headerName: t("reposList.issuescount"),
      width: 150,
    },
    {
      field: "pullRequestsCount",
      headerName: t("reposList.pullrequestcount"),
      width: 150,
    },
    {
      field: "lastCommitDate",
      headerName: t("reposList.lastcommitdate"),
      width: 150,
    },
  ];

  const openRepoUrl = (e) => {
    window.open(e.row.repoUrl);
  };

  return (
    <div style={{ height: 400, width: "100%", marginTop: 25 }}>
      {rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={openRepoUrl}
        />
      ) : (
        <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
          {t("reposList.emptyList")}
        </h3>
      )}
    </div>
  );
};

export default ReposList;
