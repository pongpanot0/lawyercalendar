import { Card, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import apiService from "../../Shared/Apiserver";
const Item = styled("div")(({ theme }) => ({

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

}));
const Createcase = ({ onCaseDataChange }) => {
  const [value, setValue] = React.useState(null);
  const [caseData, setCaseData] = useState({
    caseref: "",

    caseType: "", // Added caseType
    courtID: "", // Added courtID
    clientID: "", // Added clientID
    Customer_ref: "",
    Policy_ref: "",
    ExpiryDate: "",
    // Add other fields as needed
  });

  const handleChange3 = (event) => {
    setCaseData({
      ...caseData,
      caseType: event.target.value,
    });
    onCaseDataChange(caseData);
  };
  const handleChange7 = (event) => {
    setCaseData((prevCaseData) => {
      const updatedCaseData = {
        ...prevCaseData,
        ExpiryDate: dayjs(event).format("YYYY-MM-DD"),
      };

      onCaseDataChange(updatedCaseData); // Pass the updated data to the callback
      return updatedCaseData; // Return the updated state
    });
  };
  const handleChange4 = (event) => {
    setCaseData({
      ...caseData,
      courtID: event.target.value,
    });
    onCaseDataChange(caseData);
  };
  const handleChange5 = (event) => {
    setCaseData({
      ...caseData,
      clientID: event.target.value,
    });
    onCaseDataChange(caseData);
  };

  const handleChange2 = (e) => {
    setCaseData({
      ...caseData,
      [e.target.name]: e.target.value,
    });
    onCaseDataChange(caseData);
  };

  const [casetypeData, setCasetypeData] = React.useState([
    {
      CaseTypeID: 1,
      CaseTypeName: "",
    },
  ]);
  const [customerData, setCustomerData] = React.useState([
    {
      CourtID: 1,
      CourtName: "",
    },
  ]);
  const [courtsData, setcourtsData] = React.useState([
    {
      ClientID: 1,
      ClientName: "",
    },
  ]);
  React.useEffect(() => {
    const fetchData = async () => {
      await getCasetypedata();
      await getCustomerdata();
      await getcourtsData();
    };
    fetchData();
  }, []);
  const getCasetypedata = async () => {
    try {
      const response = await apiService.GetCaseType();
      setCasetypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getCustomerdata = async () => {
    try {
      const response = await apiService.getcustomer();
      setCustomerData(response.data);
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

  return (
    <Container maxWidth="xl">
      <Grid container item spacing={3}>
        <Grid md={12} xs={12} mt={3} Item sm={12} lg={12}>
          <h1 style={{ marginTop: 15 }}>เพิ่มข้อมูลคดี</h1>
        </Grid>
        <Grid md={6} xs={12} mt={3} Item sm={12} lg={6}>
          <Item>
            <TextField
              value={caseData.caseref}
              onChange={handleChange2}
              name="caseref"
              id=""
              label="Caseref"
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
              required={true}
            />
          </Item>
        </Grid>
        <Grid md={6} Item xs={12} mt={3} sm={12} lg={6}>
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
          </Item>
        </Grid>{" "}
        <Grid md={6} Item mt={3} xs={12} sm={12} lg={6}>
          {" "}
          <Item>
            <TextField
              value={caseData.Customer_ref}
              onChange={handleChange2}
              name="Customer_ref"
              id="5"
              label="Customer_ref"
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
              required={true}
            />
          </Item>
        </Grid>
        <Grid md={6} Item mt={3} xs={12} sm={12} lg={6}>
          {" "}
          <Item>
            <TextField
              value={caseData.Policy_ref}
              onChange={handleChange2}
              name="Policy_ref"
              id="4"
              label="Policy_ref"
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
              required={true}
            />
          </Item>
        </Grid>
        <Grid md={6} Item mt={3} xs={12} sm={12} lg={6}>
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
          </Item>
        </Grid>
        <Grid md={6} Item mt={3} xs={12} sm={12} lg={6}>
          {" "}
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ลูกค้า</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select2"
                value={caseData.clientID}
                label="Age"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange5}
                required={true}
              >
                {customerData.map((res) => {
                  return (
                    <MenuItem value={res.ClientID}>{res.ClientName}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid mt={3} Item md={12} xs={12} sm={12} lg={12}>
          {" "}
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                name="ExpiryDate"
                format="DD-MM-YYYY"
                value={caseData.ExpiryDate}
                onChange={handleChange7}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Createcase;
