import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardActionArea, Container } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import NextWeekIcon from "@mui/icons-material/NextWeek";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { PieChart } from "@mui/x-charts/PieChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartCaseType from "./Chart";
import ChartExpenses from "./ChartExpenses";
import apiService from "./Shared/Apiserver";
ChartJS.register(ArcElement, Tooltip, Legend);
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [inMonth, setinmonth] = React.useState("");
  const [allCase, setallCase] = React.useState("");
  const [inYear, setinYear] = React.useState([]);
  const [customer, setCustomer] = React.useState("");
  const [expenses, setexpenses] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await apiService.getDashboards();
        setallCase(response.query[0]?.counth ?? 0);
        setinmonth(response.queryinmount[0]?.counth ?? 0);
        setinYear(response.querygroupmonth);
        setCustomer(response.querygetCustomer[0]?.counth ?? 0);
        setexpenses(response.querygetExpenses);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDashboard();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid rowGap={2} container spacing={2} mt={1}>
        <Grid xs={12} md={4} xl={4}>
          <Item>
            <Card elevation={3}>
              <Grid container>
                <Grid xs={12} md={2} mt={1} xl={2}>
                  <WorkIcon style={{ fontSize: 48 }} />
                </Grid>
                <Grid xs={12} mt={2} md={8} xl={8}>
                  จำนวนงานทั้งหมด
                </Grid>
                <Grid xs={12} md={2} xl={2}>
                  <Grid container>
                    <Grid xs={12} md={12} xl={12}>
                      <h1>{allCase}</h1>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Item>
        </Grid>
        <Grid xs={12} md={4} xl={4}>
          {" "}
          <Item>
            <Card elevation={3}>
              {" "}
              <Grid container>
                <Grid xs={12} md={2} mt={1} xl={2}>
                  <NextWeekIcon style={{ fontSize: 48 }} />
                </Grid>
                <Grid xs={12} mt={2} md={8} xl={8}>
                  งานในเดือนนี้
                </Grid>
                <Grid xs={12} md={2} xl={2}>
                  <Grid container>
                    <Grid xs={12} md={12} xl={12}>
                      <h1>{inMonth}</h1>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Item>
        </Grid>
        <Grid xs={12} md={4} xl={4}>
          {" "}
          <Item>
            <Card elevation={3}>
              {" "}
              <Card elevation={3}>
                {" "}
                <Grid container>
                  <Grid xs={12} md={2} mt={1} xl={2}>
                    <PeopleAltIcon style={{ fontSize: 48 }} />
                  </Grid>
                  <Grid xs={12} mt={2} md={8} xl={8}>
                    จำนวนลูกค้าทั้งหมด
                  </Grid>
                  <Grid xs={12} md={2} xl={2}>
                    <Grid container>
                      <Grid xs={12} md={12} xl={12}>
                        <h1>{customer}</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Card>
          </Item>
        </Grid>
        {inYear.length > 0 && (
          <Grid xs={12} md={8} xl={8}>
            {" "}
            <Item>
              <Card elevation={3}>
                <ChartCaseType inYear={inYear} />
              </Card>
            </Item>
          </Grid>
        )}
        {expenses.length > 0 && (
          <Grid xs={12} md={4} xl={4}>
            {" "}
            <Item>
              <Card elevation={3}>
                <ChartExpenses expenses={expenses} />{" "}
              </Card>
            </Item>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
