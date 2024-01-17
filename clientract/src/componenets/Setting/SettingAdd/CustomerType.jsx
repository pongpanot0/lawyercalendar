import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
import apiService from "../../Shared/Apiserver";
function CustomerType() {
  const [customertypes_name, setcustomertypes_name] = React.useState("");
  const postData = async () => {
    const response = await apiService.CreateCustomerType(customertypes_name);
    console.log(customertypes_name);
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField
            onChange={(e) => setcustomertypes_name(e.target.value)}
            fullWidth
            id=""
            label="CustomerType Name"
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

export default CustomerType;
