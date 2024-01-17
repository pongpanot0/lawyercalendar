import { useLocation } from "react-router-dom";
import { Button, Divider, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "dayjs/locale/th";
import apiService from "../../Shared/Apiserver";

import dayjs from "dayjs";
import CaseEmployee from "./CaseEmployee";
import BeforeCaseDetail from "./BeforeCaseDetail";
import Plaintiff from "./Plaintiff";
import Defendant from "./Defendant";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BeforeCaseTocase = () => {
  const [scroll, setScroll] = React.useState("paper");
  const [ClientID, setClientIDData] = React.useState([]);
  const [LawyerID, setLawyerIDData] = React.useState([]);
  const [ReciveType, setReciveTypeData] = React.useState([]);
  const [InsuredType, setInsuredTypeData] = React.useState([]);

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
    } catch (error) {
      console.log(error.message);
    }
  };
  const getReciveType = async () => {
    try {
      const response = await apiService.getbeforecase();
      setReciveTypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getInsuredType = async () => {
    try {
      const response = await apiService.getinsuredtype();
      setInsuredTypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const { state } = useLocation();
  const [courtsData, setcourtsData] = React.useState([
    {
      ClientID: 1,
      ClientName: "",
    },
  ]);
  React.useEffect(() => {
    getClientID();
    getLawyerID();
    getReciveType();
    getInsuredType();
    getCasetypedata();
    getcourtsData();
  }, []);

  const handleChange5 = (event) => {
    setCaseData({
      ...caseData,
      clientID: event.target.value,
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

  const handleassured = (event) => {
    setCaseData({
      ...caseData,
      assured: event.target.value,
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
    Receiver: state.Receiver,
    LawyerID: state.LawyerID, // Added caseType
    clientID: state.clientID, // Added clientID
    Customer_ref: state.Customer_ref,
    policy_ref: state.policy_ref,
    claimamount: state.claimamount,
    assured: state.assured,
    timebar: state.timebar,
    DateReceived: state.DateReceived,
    insurance_type: state.insurance_type,
    CaseType: "",
    courtID: "",
  });
  const [dis, setDis] = React.useState(true);

  const handleChange3 = (event) => {
    setCaseData({
      ...caseData,
      CaseType: event.target.value,
    });
  };
  const handleChange4 = (event) => {
    setCaseData({
      ...caseData,
      courtID: event.target.value,
    });
  };

  const [casetypeData, setCasetypeData] = React.useState([
    {
      CaseTypeID: 1,
      CaseTypeName: "",
    },
  ]);
  const getCasetypedata = async () => {
    try {
      const response = await apiService.GetCaseType();
      setCasetypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getcourtsData = async () => {
    try {
      const response = await apiService.getcourts();
      setcourtsData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const postToapi = async () => {
    try {
      console.log(state);
      const data = {
        FromCase: FromCase,
        BeforeFromArray: BeforeFromArray,
        plainiffArray: plainiffArray,
        DefenantArray: DefenantArray,
        caseData: caseData,
        tsb_ref:state.tsb_ref
      };
     
      const response = await apiService.CreateBeforeCaseToCase(data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [FromCase, setFromCaseArray] = React.useState([]);
  const handleDataFromCaseEmployee = (data) => {
    // Handle the data received from CaseEmployee
    console.log("Data from CaseEmployee:", data);
    setFromCaseArray(data);
  };
  const [BeforeFromArray, setBeforeFromArray] = React.useState([]);
  const handleDataBeforeFromCaseEmployee = (data) => {
    // Handle the data received from CaseEmployee
    console.log("Data from CaseEmployee:", data);
    setBeforeFromArray(data);
  };
  const [plainiffArray, setplainiffArray] = React.useState([]);
  const handleDataPlaintiffCaseEmployee = (data) => {
    // Handle the data received from CaseEmployee
    console.log("Data from CaseEmployee:", data);
    setplainiffArray(data);
  };
  const [DefenantArray, setDefenantArray] = React.useState([]);
  const handleDataDefenantCaseEmployee = (data) => {
    // Handle the data received from CaseEmployee
    setDefenantArray(data);
    console.log("Data from CaseEmployee:", data);
  };

  return (
    <div>
      {" "}
      <Grid xs={12} md={6} xl={6}>
        <Divider textAlign="right">TSB Ref.{state.tsb_ref}</Divider>
        <Grid item container>
          <Grid xs={12} md={10} xl={10}></Grid>
          <Grid xs={12} md={2} xl={2} sx={{ marginTop: 2 }}>
            <Button
              onClick={(e) => postToapi(e)}
              variant="contained"
              fullWidth
              color="primary"
            >
              {" "}
              Add data
            </Button>
          </Grid>
          <Grid xs={12} md={6} xl={6}>
            <Item>
              <TextField
                InputLabelProps={{ shrink: true }}
                className="TextField"
                disabled={dis}
                id=""
                value={caseData.Customer_ref}
                onChange={(e) => handleCustomer_ref(e)}
                type="text"
                label="Customer_ref"
              />
            </Item>{" "}
          </Grid>
          <Grid xs={12} md={6} xl={6}>
            {" "}
            <Item>
              <TextField
                InputLabelProps={{ shrink: true }}
                disabled={dis}
                className="TextField"
                id=""
                type="text"
                value={caseData.assured}
                onChange={(e) => handleassured(e)}
                label="assured"
              />
            </Item>{" "}
          </Grid>
          <Grid xs={12} md={6} xl={6}>
            {" "}
            <Item>
              <TextField
                InputLabelProps={{ shrink: true }}
                disabled={dis}
                className="TextField"
                id=""
                type="number"
                onChange={(e) => handleClainmamount(e)}
                value={caseData.claimamount}
                label="Claim Amount"
              />
            </Item>{" "}
          </Grid>
          <Grid xs={12} md={6} xl={6}>
            {" "}
            <Item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  ประเภทประกัน
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={caseData.insurance_type}
                  label="ประเภทประกัน"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleinsurance_type}
                  required={true}
                  disabled={dis}
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
            </Item>{" "}
          </Grid>
          <Grid xs={12} md={6} xl={6}>
            {" "}
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
                  disabled={dis}
                  required={true}
                >
                  {ClientID.map((res) => {
                    return (
                      <MenuItem value={res.ClientID}>{res.ClientName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Item>{" "}
          </Grid>

          <Grid xs={12} md={6} xl={6}>
            {" "}
            <Item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ประเภทคดี</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={caseData.CaseType}
                  label="Age"
                  onChange={handleChange3}
                  required={true}
                >
                  {casetypeData.map((res) => {
                    return (
                      <MenuItem id={res.CaseTypeID} value={res.CaseTypeID}>
                        {res.CaseTypeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Item>{" "}
          </Grid>
          <Grid xs={12} md={6} xl={6}>
            {" "}
            <Item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">CourtID</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select22"
                  value={caseData.CourtID}
                  label="Age"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange4}
                  required={true}
                >
                  {courtsData.map((res, index) => {
                    return (
                      <MenuItem id={index} value={res.CourtID}>
                        {res.CourtName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Item>{" "}
          </Grid>

          <Grid xs={12} md={6} xl={6}>
            {" "}
            <Item>
              <TextField
                InputLabelProps={{ shrink: true }}
                aria-readonly={true}
                className="TextField"
                disabled={dis}
                id=""
                type="text"
                label="timebar"
                value={dayjs(caseData.timebar).format("YYYY-MM-DD")}
              />
            </Item>{" "}
          </Grid>
          <Grid xs={12} md={12} xl={12}>
            <BeforeCaseDetail
              onBeforeCaseDataSubmit={handleDataBeforeFromCaseEmployee}
            />{" "}
          </Grid>
          <Grid xs={12} md={10} xl={10}></Grid>
          <Grid xs={12} md={2} xl={2}>
            <Item>
              <Button variant="contained" fullWidth color="primary">
                เพิ่มผู้รับผิดชอบ
              </Button>
            </Item>
          </Grid>
          <Grid xs={12} md={12} xl={12}>
            <CaseEmployee onDataSubmit={handleDataFromCaseEmployee} />{" "}
          </Grid>

          <Grid xs={12} md={10} xl={10}></Grid>
          <Grid xs={12} md={2} xl={2}>
            <Item>
              <Button variant="contained" fullWidth color="primary">
                เพิ่มโจทก์
              </Button>
            </Item>
          </Grid>
          <Grid xs={12} md={12} xl={12}>
            <Plaintiff PlaintiffSubmit={handleDataPlaintiffCaseEmployee} />{" "}
          </Grid>
          <Grid xs={12} md={10} xl={10}></Grid>
          <Grid xs={12} md={2} xl={2}>
            <Item>
              <Button variant="contained" fullWidth color="primary">
                เพิ่มจำเลย
              </Button>
            </Item>
          </Grid>
          <Grid xs={12} md={12} xl={12}>
            <Defendant
              onBeforeDefenantSubmit={handleDataDefenantCaseEmployee}
            />{" "}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default BeforeCaseTocase;
