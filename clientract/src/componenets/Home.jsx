import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import "./Home.css";
import { BarChart } from "@mui/x-charts/BarChart";
const Home = () => {
  return (
    <>
      <Grid container spacing={2} mt={1}>
        <Grid item sm={12} xl={6} xs={12}>
          <Card className="card1">
            <CardContent>
              <Typography
                gutterBottom
                color={"white"}
                variant="h5"
                component="div"
              >
                <FaIcons.FaBitcoin />
              </Typography>
              <Typography variant="h4" color={"white"}>
                120 Case
              </Typography>
              <Typography ml={2} color={"white"} variant="body1">
                Win case
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} xl={6} xs={12}>
          <Card className="card2">
            <CardContent>
              <Typography
                color={"white"}
                gutterBottom
                variant="h5"
                component="div"
              >
                <FaIcons.FaBuysellads />
              </Typography>
              <Typography color={"white"} variant="h4">
                10 Case
              </Typography>
              <Typography ml={2} color={"white"} variant="body1">
                Lose case
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "group A",
                  "group B",
                  "group C",
                  "group x",
                  "group z",
                  "group v",
                  "group f",
                  "group g",
                  "group h",
                ],
              },
            ]}
            series={[
              { data: [4, 3, 5, 4, 3, 5, 4, 3, 5] },
              { data: [1, 6, 3, 4, 3, 5, 4, 3, 5] },
              { data: [2, 5, 6, 4, 3, 5, 4, 3, 5] },
            ]}
            width={650}
            height={300}
          />
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={650}
            height={300}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
