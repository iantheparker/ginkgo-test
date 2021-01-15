import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: 5,
  },
}));

export default function BasicForm() {
  const url = "api/searchasync";
  const classes = useStyles();
  const [identity, setIdentity] = useState({ search: "" });
  const [success, setSuccess] = useState(undefined);
  const [resp, setResp] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);

  function handleInputSearch(e) {
    setIdentity({ ...identity, search: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const data = new FormData();
    data.set("q", identity.search);

    axios({
      method: "post",
      url: url,
      data: data,
    })
      .then(function (response) {
        console.log(response);
        setResp(response.data.result);
        setSuccess(true);
        setSubmitted(false);
      })
      .catch(function (response) {
        setSuccess(false);
        setSubmitted(false);
        console.log(response);
      });
  }

  function Alerting() {
    if (success === true && resp) {
      return (
        <Alert severity={resp.score ? "success" : "warning"}>
          {JSON.stringify(resp)}
        </Alert>
      );
    } else if (success === false) {
      return <Alert severity="error">Oops. An error just occurred!</Alert>;
    } else {
      return null;
    }
  }

  function ButtonSpinner() {
    if (submitted) {
      return <CircularProgress />;
    } else {
      return (
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      );
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.input}>
            <p>
              Give me a DNA sequence and I'll tell you if it's in one of my
              favorite proteins!
            </p>
            <TextField
              required
              name="search"
              id="search"
              label="Enter in a DNA Sequence"
              fullWidth={true}
              value={identity.search}
              onChange={handleInputSearch}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography align="center">
              <ButtonSpinner></ButtonSpinner>
              <div style={{ marginTop: 10 }}>
                <Alerting></Alerting>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
