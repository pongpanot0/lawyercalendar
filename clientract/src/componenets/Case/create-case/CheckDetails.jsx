import { Grid, TextField } from "@mui/material";
import React from "react";
import "./CheckDetails.css";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import apiService from "../../Shared/Apiserver";
const Item = styled("div")(({ theme }) => ({
 
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

}));
function CheckDetails({ caseData, responsiblePersonData }) {
  console.log({ caseData, responsiblePersonData });
  React.useEffect(() => {
    const fetchData = async () => {
      await getCasetypedata();
      await getCustomerdata();
      await getcourtsData();
      await getEmployeesData();
      await getemploycasetypeData();
    };
    fetchData();
  }, []);
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
  const [employeesData, setEmployeesData] = React.useState([]);
  const [employeescasetype, setEmployeescasetypeData] = React.useState([]);

  const getEmployeesData = async () => {
    try {
      const response = await apiService.getEmployee();
      setEmployeesData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getemploycasetypeData = async () => {
    try {
      const response = await apiService.getEmployeecaseType();
      setEmployeescasetypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h2 style={{ marginTop: 15 }}>CheckDetails Component</h2>
      <Grid item container spacing={3} mt={2}>
        <Grid s={12} xl={12} md={12}>
          {" "}
        </Grid>
        <Grid xs={12} xl={6} md={6}>
          <Item>
            <TextField
              aria-readonly={true}
              className="TextField"
              id=""
              label="caseref"
              value={caseData.caseref}
            />
          </Item>
        </Grid>
        <Grid xs={12} xl={6} md={6}>
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ประเภทคดี</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={caseData.caseType || 1}
                label="Age"
                fullWidth
                required={true}
                readOnly
                defaultValue={caseData.caseType}
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
        </Grid>
        <Grid xs={12} xl={6} md={6}>
          {" "}
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">CourtID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select22"
                value={caseData.courtID}
                label="Age"
                InputLabelProps={{ shrink: true }}
                required={true}
              >
                {courtsData.map((res, index) => {
                  return (
                    <MenuItem value={res.CourtID}>{res.CourtName}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid xs={12} xl={6} md={6}>
          {" "}
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ClientID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select2"
                value={caseData.clientID}
                label="Age"
                InputLabelProps={{ shrink: true }}
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
        <Grid xs={12} xl={6} md={6}>
          {" "}
          <Item>
            <TextField
              aria-readonly={true}
              className="TextField"
              id=""
              label="Customer_ref"
              value={caseData.Customer_ref}
            />
          </Item>
        </Grid>
        <Grid xs={12} xl={6} md={6}>
          {" "}
          <Item>
            <TextField
              aria-readonly={true}
              className="TextField"
              id=""
              label="Policy_ref"
              value={caseData.Policy_ref}
            />
          </Item>
        </Grid>
        <Grid xs={12} xl={12} md={12}>
          {" "}
          <Item>
            <TextField
              value={caseData.ExpiryDate}
              name="ExpiryDate"
              id=""
              label="TimeBar"
              required={true}
              type="date"
              InputLabelProps={{ shrink: true }}
              style={{ width: "100%" }}
            />
          </Item>
        </Grid>

        <Grid xs={12} xl={12} md={12}>
          รายชื่อผู้รับผิดชอบ
        </Grid>
        {responsiblePersonData?.inputFields?.map((res, index) => {
          return (
            <Grid container>
              <Grid xs={12} xl={6} md={6}>
                <Item>
                  <FormControl fullWidth>
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                      เลือกผู้รับผิดชอบ
                    </InputLabel>
                    <Select
                      labelId={`demo-simple-select-label-${index}`}
                      id={`demo-simple-select-${index}`}
                      value={res.value}
                      label="เลือกผู้รับผิดชอบ"
                    >
                      {employeesData.map((res) => {
                        return (
                          <MenuItem value={res.employee_id}>
                            {res.employee_firstname} {""}{" "}
                            {res.employee_lastname}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                <Item>
                  <FormControl fullWidth>
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                      เลิอกประเภท
                    </InputLabel>
                    <Select
                      labelId={`demo-simple-select-label-${index}`}
                      id={`demo-simple-select-${index}`}
                      value={res.age}
                      label="เลิอกประเภท"
                    >
                      {employeescasetype.map((res) => {
                        return (
                          <MenuItem value={res.employeescasetype_id}>
                            {res.employeescasetype_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                
                </Item>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default CheckDetails;
