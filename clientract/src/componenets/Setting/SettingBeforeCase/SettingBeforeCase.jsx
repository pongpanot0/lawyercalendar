import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField } from "@mui/material";
import apiService from "../../Shared/Apiserver";

const SettingBeforeCase = () => {
  const [beforecase_name, setbeforecase_name] = React.useState("");
  const postData = async () => {
    const response = await apiService.createbeforecase(beforecase_name);
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField
            onChange={(e) => setbeforecase_name(e.target.value)}
            fullWidth
            id=""
            label="Beforecase Name"
          />
        </Grid>
        <Grid xs={12} mt={2} mb={2}>
          {" "}
          <Button onClick={(e) => postData()} variant="contained" fullWidth>
            Add data
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingBeforeCase;
