import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
import apiService from "../../Shared/Apiserver";
function Casetype({okdata}) {
  const [CaseTypeName, setCaseTypeName] = React.useState("");
  const postData = async () => {
    const response = await apiService.CreateCaseType(CaseTypeName);
    okdata()
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField
            onChange={(e) => setCaseTypeName(e.target.value)}
            fullWidth
            id=""
            label="ประเภทคดี"
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
}

export default Casetype;
