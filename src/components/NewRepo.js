import React, { Fragment, useContext, useState } from "react";
import { Input, Button } from "@mui/material";
import GithubContext from "../context/githubContext";

const NewRepo = () => {
  const githubContext = useContext(GithubContext);
  const { user, createUserRepo } = githubContext;

  const [repository, setRepository] = useState({
    name: "",
    description: "",
    homepageUrl: "",
    visibility: "",
    hasIssuesEnabled: "",
    hasWikiEnabled: "",
  });
  const {
    name,
    description,
    homepageUrl,
    visibility,
    hasIssuesEnabled,
    hasWikiEnabled,
  } = repository;
  // const [description, setDescription] = useState("");
  // const [homepageUrl, setHomepageUrl] = useState("");
  // const [visibility, setVisibility] = useState("PUBLIC");
  // const [hasIssuesEnabled, setHasIssuesEnabled] = useState(false);
  // const [hasWikiEnabled, setHasWikiEnabled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    createUserRepository();
  };

  const createUserRepository = () => {
    createUserRepo(...repository, user.id);
  };

  const onChange = (e) =>
    setRepository({ ...repository, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <form onSubmit={onSubmit} className="form">
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
        <Button type="submit">Create Repo</Button>
      </form>
    </Fragment>
  );
};

export default NewRepo;
