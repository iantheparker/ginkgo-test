import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import BasicForm from "./components/BasicForm.js";

function App() {
  return (
    <Container>
      <Grid container justify="center">
        <h1>GATTACA</h1>
      </Grid>
      <BasicForm></BasicForm>;
    </Container>
  );
}

export default App;
