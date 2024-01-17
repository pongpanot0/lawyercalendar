import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
function RoleType() {
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField fullWidth id="" label="RoleType Name" />
        </Grid>
        <Grid xs={12} mt={2} mb={2}>
          {" "}
          <Button variant="contained" fullWidth>
            Add data
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoleType;
