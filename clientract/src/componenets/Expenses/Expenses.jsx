import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import apiService from "../Shared/Apiserver";
import TableChartIcon from "@mui/icons-material/TableChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpensesChart from "./ExpensesChart";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const Expenses = () => {
  const columns = [
    { field: "expensesType_name", headerName: "expensesType_name", width: 200 },
    {
      field: "expenses",
      headerName: "expenses",
      type: "number",
      width: 200,
    },
    {
      field: "employee_firstname",
      headerName: "Full name",

      sortable: false,
      width: 300,
      valueGetter: (params) =>
        `${params.row.employee_firstname || ""} ${
          params.row.employee_lastname || ""
        }`,
    },
    { field: "PaymentDate", headerName: "PaymentDate", width: 200 },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  const [showValues, setshowValues] = React.useState(1);
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await apiService.getcaseexpenses();
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container maxWidth="xl">
      <Grid container item>
        <Grid xs={10} md={10} xl={10}></Grid>
        <Grid xs={2} md={2} xl={2}>
          <Button
            onClick={(e) => setshowValues(1)}
            aria-label="delete"
            variant="contained"
            style={{ marginRight: 5 }}
          >
            <TableChartIcon size="large" />
          </Button>

          <Button
            onClick={(e) => setshowValues(2)}
            aria-label="delete"
            variant="contained"
          >
            <BarChartIcon size="large" />
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: 10 }}>
        {" "}
        {showValues == 1 && (
          <Grid container item spacing={2}>
            <Grid xs={12} md={12} xl={12}>
              <Link to={"/expenses-create"}>
                <Button variant="contained" color="primary">
                  {" "}
                  Add data
                </Button>
              </Link>
            </Grid>
            <Grid xs={12} md={12} xl={12}>
              <Item>
                <DataGrid
                  rows={data}
                  columns={columns}
                  getRowId={(row) => row.ExpenseID}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </Item>
            </Grid>
          </Grid>
        )}
        {showValues == 2 && (
          <div>
            <ExpensesChart data={data} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Expenses;
