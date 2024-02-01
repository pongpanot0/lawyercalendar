import { Button, Container, Grid, Stack } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import apiService from "../Shared/Apiserver";
import TableChartIcon from "@mui/icons-material/TableChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpensesChart from "./ExpensesChart";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import ExcelService from "../Shared/Excelservice";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const Expenses = () => {
  const columns = [
    { field: "expensesType_name", headerName: "ประเภท", width: 200 },
    {
      field: "expenses",
      headerName: "จำนวนเงิน",
      type: "number",
      width: 200,
    },
    {
      field: "employee_firstname",
      headerName: "ผู้จ่าย",

      sortable: false,
      width: 300,
      valueGetter: (params) =>
        `${params.row.employee_firstname || ""} ${
          params.row.employee_lastname || ""
        }`,
    },
    {
      field: "PaymentDate",
      headerName: "วันที่จ่าย",
      width: 200,
      valueGetter: (params) =>
        `${dayjs(params.row.PaymentDate).format("DD/MM/YYYY") || ""}`,
    },

    ,
  ];
  const [expenseType, setexpenseType] = React.useState([]);
  const [expenses, setexpenses] = React.useState("ทั้งหมด");
  const [paid_type2, setpaid_type] = React.useState("ทั้งหมด");
  const [expensestoapi, setexpensestoapi] = React.useState("ทั้งหมด");
  const [paid_type2toapi, setpaid_typetoapi] = React.useState("ทั้งหมด");
  const PaidType = (event) => {
    setpaid_type(event.target.value);
    const toapi = event.target.value

    setpaid_typetoapi(toapi);
  };
  React.useEffect(() => {
    getData();
    getExpensesType();
    getEmployees();
  }, []);

  const exportExcel = async () =>{
    try {
      console.log(paid_type2toapi);
      const datedata = {
        startDate: startDate,
        endDate: endDate,
        payertoapi: payertoapi,
        expensestoapi: expensestoapi,
        paid_type2toapi: paid_type2toapi,
      };
      const response = await apiService.exportExcelExpenses(datedata)

      ExcelService.downloadFromBase64(response, "CaseExpenses.xlsx");
    } catch (error) {
      console.log(error.message);
    }
  }
  const [Employee, setEmployee] = React.useState([]);
  const [payer, setpayer] = React.useState("ทั้งหมด");
  const [payertoapi, setpayertoapi] = React.useState("ทั้งหมด");
  const getEmployees = async () => {
    try {
      const response = await apiService.getEmployee();
      setEmployee(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getExpensesType = async () => {
    try {
      const response = await apiService.getexpensesType();
      setexpenseType(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange5 = (event) => {
    setexpenses(event.target.value);
    const toapi = event.target.value.split("&&");
 
    setexpensestoapi(toapi[1]);
  };
  const handleChange6 = (event) => {
    setpayer(event.target.value);
    const toapi = event.target.value.split("&&");
    setpayertoapi(toapi[1]);
  };
  const [showValues, setshowValues] = React.useState(1);
  const [data, setData] = React.useState([]);
  const getData = async () => {
    const datedata = {
      startDate: startDate,
      endDate: endDate,
      payertoapi: payertoapi,
      expensestoapi: expensestoapi,
      paid_type2toapi: paid_type2toapi,
    };
    try {
      const response = await apiService.getcaseexpenses(datedata);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [startDate, setStartDate] = React.useState(
    dayjs(new Date()).startOf("months")
  );
  const [endDate, setEndDate] = React.useState(dayjs(new Date()));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const filteredData = data.filter((item) => {
    // Check if searchTerm matches tsb_ref and casetype matches CaseTypeName
    const payername = payer.split("&&");

    const expensesname = expenses.split("&&");
    const paidname = paid_type2.split("&&");

    const expensesmatc =
      expensesname[0] === "ทั้งหมด" ||
      item.expensesType_name.includes(expensesname[0]);
    const payermatch =
      payername[0] === "ทั้งหมด" ||
      item.employee_firstname.includes(payername[0]);
    const paidType =
    paid_type2 === "ทั้งหมด" || paid_type2.includes(item.paid_type);

    return expensesmatc && payermatch && paidType;
  });

  return (
    <Container maxWidth="xl">
      <Grid container item>
        <Grid xs={12} md={2} xl={2}>
          <Item>
            <Link to={"/insert-expenesnull"}>
              <Button variant="contained" color="primary" fullWidth>
                {" "}
                เพิ่มข้อมูล
              </Button>
            </Link>
          </Item>
        </Grid>
        <Grid xs={12} md={2} xl={2}>
          <Item>
         
              <Button onClick={exportExcel} variant="contained" color="primary" fullWidth>
                {" "}
                Export Excel
              </Button>
         
          </Item>
        </Grid>
        <Grid xs={10} md={6} xl={6}></Grid>

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
          <Grid container mt={2} item spacing={2}>
            <Grid xs={10} md={2} xl={2}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ประเภทค่าใช้จ่าย
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    value={expenses}
                    label="ประเภทค่าใช้จ่าย"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange5}
                    required={true}
                  >
                    {" "}
                    <MenuItem value={"ทั้งหมด"}>ทั้งหมด</MenuItem>
                    {expenseType.map((res) => {
                      return (
                        <MenuItem
                          id={res.expensesType_id}
                          value={`${res.expensesType_name}&&${res.expensesType_id}`}
                        >
                          {res.expensesType_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid xs={10} md={2} xl={2}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ผู้จ่าย</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    value={payer}
                    label="ผู้จ่าย"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange6}
                    required={true}
                  >
                    {" "}
                    <MenuItem value={"ทั้งหมด"}>ทั้งหมด</MenuItem>
                    {Employee.map((res) => {
                      return (
                        <MenuItem
                          value={`${res.employee_firstname}&&${res.employee_id}`}
                        >
                          {res.employee_firstname} {res.employee_lastname}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid xs={12} md={2} xl={2}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ประเภทการเบิก
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paid_type2}
                    label="ประเภทการเบิก"
                    InputLabelProps={{ shrink: true }}
                    onChange={PaidType}
                    required={true}
                  >
                    <MenuItem value={"ทั้งหมด"}>ทั้งหมด</MenuItem>
                    <MenuItem value={"1"}>โอนให้ก่อน</MenuItem>
                    <MenuItem value={"2"}>รอตั้งเบิก</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid xs={12} md={4} xl={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction={"row"}>
                  <Item>
                    <DatePicker
                      label="ระหว่าง"
                      value={startDate}
                      format="DD/MM/YYYY"
                      onChange={handleStartDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Item>
                  <Item>
                    <DatePicker
                      label="ถึง"
                      format="DD/MM/YYYY"
                      value={endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Item>
                </Stack>
              </LocalizationProvider>
            </Grid>

            <Grid xs={12} md={2} xl={2}>
              <Item>
                <Button fullWidth variant="contained" onClick={getData}>
                  ค้นหา
                </Button>
              </Item>
            </Grid>

            <Grid xs={12} md={12} xl={12}>
              <Item>
                <DataGrid
                  rows={filteredData}
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
