import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
import apiService from "../../Shared/Apiserver";
function EmployeeJob() {
  const [employeesjob, setemployeesjob] = React.useState("");
  const postData = async () => {
    const response = await apiService.createEmployeejob(employeesjob);
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField
            onChange={(e) => setemployeesjob(e.target.value)}
            fullWidth
            id=""
            label="EmployeeJob Name"
          />
        </Grid>
        <Grid xs={12} mt={2} mb={2}>
          {" "}
          <Button onClick={(e) => postData(e)} variant="contained" fullWidth>
            Add data
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EmployeeJob;
