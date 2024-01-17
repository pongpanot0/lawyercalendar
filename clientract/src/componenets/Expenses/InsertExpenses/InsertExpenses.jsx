import { styled } from "@mui/material/styles";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import apiService from "../../Shared/Apiserver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const InsertExpenses = () => {
  const handleChange5 = (event) => {
    setCaseData({
      ...caseData,
      expensesType: event.target.value,
    });
    
  };
  const Payer = (event) => {
    setCaseData({
      ...caseData,
      Payer: event.target.value,
    });
    
  };
  const CaseID = (event) => {
    setCaseData({
      ...caseData,
      CaseID: event.target.value,
    });
    console.log(caseData);
  };
  const expenses_ref = (event) => {
    setCaseData({
      ...caseData,
      expenses_ref: event.target.value,
    });
    console.log(event);
  };
  const handleDateReceived = (event) => {
    console.log(event);
    setCaseData({
      ...caseData,
      PaymentDate: event,
    });
  };
  React.useEffect(() => {
    getExpensesType();
    getEmployees();
    getCaseData();
  }, []);
  const [expenseType, setexpenseType] = React.useState([]);
  const [Employee, setEmployee] = React.useState([]);
  const [cases, setCase] = React.useState([]);
  const getExpensesType = async () => {
    try {
      const response = await apiService.getexpensesType();
      setexpenseType(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getEmployees = async () => {
    try {
      const response = await apiService.getEmployee();
      setEmployee(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getCaseData = async () => {
    try {
      const response = await apiService.getCase();
      setCase(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const expenses = (event) => {
    setCaseData({
      ...caseData,
      expenses: event.target.value,
    });
    console.log(caseData);
  };
  const [caseData, setCaseData] = useState({
    CaseID: "",
    Payer: "",
    PaymentStatus: "",
    PaymentDate: "",
    expensesType: "",
    expenses_ref: "",
    expenses: "",
    // Add other fields as needed
  });

  const postData = async () => {
    try {
      const response = await apiService.creatcaseeexpenses(caseData);
      console.log(response.data);
    } catch (error) {}
  };

  return (
    <Grid container item>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <TextField
            type="number"
            onChange={expenses}
            className="TextField"
            id="1"
            label="expenses"
          />
        </Item>
      </Grid>{" "}
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">expensesType</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caseData.expensesType}
              label="Age"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange5}
              required={true}
            >
              {expenseType.map((res) => {
                return (
                  <MenuItem value={res.expensesType_id}>
                    {res.expensesType_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Lawyer id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caseData.clientID}
              label="Age"
              InputLabelProps={{ shrink: true }}
              onChange={Payer}
              required={true}
            >
              {Employee.map((res) => {
                return (
                  <MenuItem value={res.employee_id}>
                    {res.employee_firstname} {res.employee_lastname}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      {caseData.expensesType != 1 && (
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              className="TextField"
              id=""
              label="expenses_ref"
              onChange={(e) => expenses_ref(e)}
            />
          </Item>
        </Grid>
      )}
      {caseData.expensesType == 1 && (
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Case ID </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={caseData.CaseID}
                label="Age"
                InputLabelProps={{ shrink: true }}
                onChange={CaseID}
                required={true}
              >
                {cases.map((res) => {
                  return <MenuItem value={res.CaseID}>{res.Caseref}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Item>
        </Grid>
      )}
      <Grid xs={12} md={12} xl={12}>
        <Item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              name="DateReceived"
              format="DD-MM-YYYY"
              value={caseData.DateReceived}
              onChange={handleDateReceived}
            />
          </LocalizationProvider>
        </Item>
      </Grid>
      <Grid xs={12} md={12} xl={12}>
        <Item>
          <Button
            onClick={(e) => postData()}
            fullWidth
            variant="contained"
            color="primary"
          >
            {" "}
            Add data
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
};

export default InsertExpenses;
