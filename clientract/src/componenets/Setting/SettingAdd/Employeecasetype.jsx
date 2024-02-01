import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
import apiService from "../../Shared/Apiserver";
const Employeecasetype = ({okdata}) => {
  const [EmployeecaseType_name, setEmployeecaseType_name] = React.useState("");
  const postData = async () => {
    try {
      const response = await apiService.createEmployeecaseType(
        EmployeecaseType_name
      );
      okdata()
    } catch (error) {}
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField
            onChange={(e) => setEmployeecaseType_name(e.target.value)}
            fullWidth
            id=""
            label="ประเภทพนักงานในคดี"
          />
        </Grid>
        <Grid xs={12} mt={2} mb={2}>
          {" "}
          <Button onClick={(e) => postData(e)} variant="contained" fullWidth>
            เพิ่ม
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Employeecasetype;
