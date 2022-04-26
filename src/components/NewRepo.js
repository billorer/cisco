import React, { Fragment, useContext, useState } from "react";

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
      <form onSubmit={onSubmit} className="form">
        <FormGroup
          sx={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={onChange}
          />
          <Input
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
          <FormControl>
            <FormLabel sx={{ alignSelf: "center" }}>Visibility</FormLabel>
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
          <FormGroup>
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
          Create Repo
        </Button>
      </form>
    </Fragment>
  );
};

export default NewRepo;
