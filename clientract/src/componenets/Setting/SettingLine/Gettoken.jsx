import { Container, Grid, Paper, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const useStyle = (theme) => ({
  root: {
    height: "100vh",
    paddingTop: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: theme.spacing(4),
  },
  addButton: {
    "& svg": {
      fill: theme.palette.common.white,
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
  marginTop: {
    paddingTop: theme.spacing(2),
  },
});
const clientId = 'B2SDUcej5I0rIBAK0CPhfE';
const redirectUrl = 'http://localhost:3000/lawyer/Testsendline';
const state = 'user_id=1';

const authorizationUrl = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=notify&state=${state}`;

const Gettoken = () => {
  return (
    <div>
      <Grid container >
        <Grid item xs={12} sm={12}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  LINE Notify request
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link
                  to={authorizationUrl}
                >
                  <Button color="primary" fullWidth variant="contained">
                    Request token
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Gettoken;
