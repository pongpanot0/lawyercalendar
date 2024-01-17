import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "dayjs/locale/th";
import apiService from "../../Shared/Apiserver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Insertbefore = () => {
  dayjs.locale("th"); // หากต้องการให้เป็นภาษาไทย
  const handleChange5 = (event) => {
    setCaseData({
      ...caseData,
      clientID: event.target.value,
    });
  };
  const handleReciveType = (event) => {
    setCaseData({
      ...caseData,
      ReciveType: event.target.value,
    });
  };
  const handleLawyer = (event) => {
    setCaseData({
      ...caseData,
      Lawyer: event.target.value,
    });
  };
  const handleCustomer_ref = (event) => {
    setCaseData({
      ...caseData,
      Customer_ref: event.target.value,
    });
  };
  const handleClainmamount = (event) => {
    setCaseData({
      ...caseData,
      claimamount: event.target.value,
    });
  };
  const handletimebar = (event) => {
    setCaseData({
      ...caseData,
      timebar: event,
    });
  };
  const handleassured = (event) => {
    setCaseData({
      ...caseData,
      assured: event.target.value,
    });
  };
  const handleDateReceived = (event) => {
    console.log(event);
    setCaseData({
      ...caseData,
      DateReceived: event,
    });
  };
  const handleinsurance_type = (event) => {
    console.log(event);
    setCaseData({
      ...caseData,
      insurance_type: event.target.value,
    });
  };
  
  const [caseData, setCaseData] = useState({
    ReciveType: "",
    Lawyer: "", // Added caseType
    clientID: "", // Added clientID
    Customer_ref: "",
    policy_ref: "",
    claimamount: "",
    assured: "",
    timebar: "",
    DateReceived: "",
    insurance_type:"",
  });
  React.useEffect(() => {
    getClientID();
    getLawyerID();
    getReciveType();
    getInsuredType();
  }, []);
  const [ClientID, setClientIDData] = React.useState([]);
  const [LawyerID, setLawyerIDData] = React.useState([]);
  const [ReciveType, setReciveTypeData] = React.useState([]);
  const [InsuredType,setInsuredTypeData] = React.useState([])
  const getClientID = async () => {
    try {
      const response = await apiService.getcustomer();
      setClientIDData(response.data);
    } catch (error) {}
  };
  const getLawyerID = async () => {
    try {
      const response = await apiService.getEmployee();
      setLawyerIDData(response.data);
    } catch (error) {}
  };
  const getReciveType = async () => {
    try {
      const response = await apiService.getbeforecase();
      setReciveTypeData(response.data);
    } catch (error) {}
  };
  const getInsuredType = async () => {
    try {
      const response = await apiService.getinsuredtype();
      setInsuredTypeData(response.data);
    } catch (error) {}
  };

  const postData = async () => {
    try {
      const response = await apiService.createbeforecasedocuments(caseData);
    } catch (error) {}
  };
  return (
    <Grid container item>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">ClientID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caseData.clientID}
              label="ClientID"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange5}
              required={true}
            >
              {ClientID.map((res) => {
                return (
                  <MenuItem value={res.ClientID}>{res.ClientName}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">ReciveType</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caseData.ReciveType}
              label="Age"
              InputLabelProps={{ shrink: true }}
              onChange={handleReciveType}
              required={true}
            >
              {ReciveType.map((res) => {
                return (
                  <MenuItem value={res.beforecase_id}>
                    {res.beforecase_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <TextField
            aria-readonly={true}
            className="TextField"
            id=""
            onChange={handleCustomer_ref}
            label="Claim No."
            value={caseData.Customer_ref}
          />
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">ประเภทประกัน</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caseData.insurance_type}
              label="ประเภทประกัน"
              InputLabelProps={{ shrink: true }}
              onChange={handleinsurance_type}
              required={true}
            >
              {InsuredType.map((res) => {
                return (
                  <MenuItem value={res.insurance_type_id}>
                    {res.insurance_type_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <TextField
            aria-readonly={true}
            className="TextField"
            id=""
            type="number"
            onChange={handleClainmamount}
            label="Claim Amount"
            value={caseData.claimamount}
          />
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <TextField
            aria-readonly={true}
            className="TextField"
            id=""
            onChange={handleassured}
            label="ผู้เอาประกัน"
            value={caseData.assured}
          />
        </Item>
      </Grid>
      <Grid xs={12} md={12} xl={12}>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Lawyer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={caseData.Lawyer}
              label="Age"
              InputLabelProps={{ shrink: true }}
              onChange={handleLawyer}
              required={true}
            >
              {LawyerID.map((res) => {
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
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              name="DateReceived"
              format="DD-MM-YYYY"
              label="DateReceived"
              value={caseData.DateReceived}
              onChange={handleDateReceived}
            />
          </LocalizationProvider>
        </Item>
      </Grid>
      <Grid xs={12} md={6} xl={6}>
        <Item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              name="TimeBar"
              label="TimeBar"
              format="DD-MM-YYYY"
              value={caseData.timebar}
              onChange={handletimebar}
            />
          </LocalizationProvider>
        </Item>
      </Grid>
      <Grid xs={12} md={12} xl={12}>
        <Item>
          <Button
            onClick={(e) => postData()}
            variant="contained"
            color="primary"
            fullWidth
          >
            {" "}
            Add data
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Insertbefore;
