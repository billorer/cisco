import React, { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Input,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";

import GithubContext from "../context/githubContext";

const NewRepo = () => {
  const { t } = useTranslation("common");
  const githubContext = useContext(GithubContext);
  const { user, createUserRepo } = githubContext;

  const [repository, setRepository] = useState({
    name: "",
    description: "",
    homepageUrl: "",
    visibility: "PUBLIC",
    hasIssuesEnabled: false,
    hasWikiEnabled: false,
  });
  const {
    name,
    description,
    homepageUrl,
    visibility,
    hasIssuesEnabled,
    hasWikiEnabled,
  } = repository;

  const onSubmit = (e) => {
    e.preventDefault();
    createUserRepository();
  };

  const createUserRepository = () => {
    createUserRepo(
      name,
      description,
      homepageUrl,
      visibility,
      hasIssuesEnabled,
      hasWikiEnabled,
      user.id
    );
  };

  const onChange = (e) =>
    setRepository({ ...repository, [e.target.name]: e.target.value });

  const onCheckboxChange = (e) =>
    setRepository({ ...repository, [e.target.name]: e.target.checked });

  return (
    <Fragment>
      <h4 style={{ marginBottom: "0", textAlign: "center" }}>
        {t("newRepo.createRepo")}
      </h4>
      <form onSubmit={onSubmit} className="form">
        <FormGroup
          sx={{
            flexDirection: "column",
            alignItems: "center",
            margin: "0 0 25px 0",
          }}
        >
          <Input
            style={{ width: "400px" }}
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
          <Input
            style={{ width: "400px" }}
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={onChange}
          />
          <Input
            style={{ width: "400px" }}
            type="text"
            name="homepageUrl"
            placeholder="HomepageUrl"
            value={homepageUrl}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl
            sx={{
              margin: "0 25px ",
            }}
          >
            <FormLabel sx={{ alignSelf: "center" }}>
              {" "}
              {t("newRepo.visibility")}
            </FormLabel>
            <RadioGroup
              defaultValue="PUBLIC"
              name="visibility"
              value={visibility}
              onChange={onChange}
              sx={{ flexDirection: "row" }}
            >
              <FormControlLabel
                value="PUBLIC"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="PRIVATE"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
          <FormGroup
            sx={{
              margin: "0 25px ",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="hasIssuesEnabled"
                  value={hasIssuesEnabled}
                  onChange={onCheckboxChange}
                />
              }
              label="IssuesEnabled"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasWikiEnabled"
                  value={hasWikiEnabled}
                  onChange={onCheckboxChange}
                />
              }
              label="WikiEnabled"
            />
          </FormGroup>
        </FormGroup>
        <Button sx={{ alignSelf: "center" }} type="submit">
          {t("newRepo.save")}
        </Button>
      </form>
    </Fragment>
  );
};

export default NewRepo;
