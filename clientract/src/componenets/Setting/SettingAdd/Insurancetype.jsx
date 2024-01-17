import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
import apiService from "../../Shared/Apiserver";
const Insurancetype = () => {
  const [expensesType_name, setexpensesType_name] = React.useState("");
  const postData = async () => {
    try {
        const response = await apiService.createinsuredtype(expensesType_name);
    } catch (error) {
        
    }
  
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          {" "}
          <TextField
            onChange={(e) => setexpensesType_name(e.target.value)}
            fullWidth
            id=""
            label="expenses Name"
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
};

export default Insurancetype;
