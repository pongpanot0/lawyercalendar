import { Button, Card, Chip, Divider, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import apiService from "../Shared/Apiserver";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaTrash } from "react-icons/fa";
import SweetAlert from "../Shared/SweetAlrt";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const InsertNotice = ({ beforecase_id,loaddata }) => {

  
  React.useEffect(() => {
    getEmployees();
    getCaseData();
  }, []);
  const [Employee, setEmployee] = React.useState([]);
  const [cases, setCase] = React.useState([]);

  const [caseDataArray, setCaseDataArray] = useState([
    {
      DocumentID: beforecase_id,
      Payer: "",
      PaymentStatus: "",
      PaymentDate: "",
      expensesType: 6,
      expenses_ref: beforecase_id,
      expenses: "",
      // Add other fields as needed
    },
  ]);
  const Payer = (event, index) => {
    updateCaseDataArray(index, {
      ...caseDataArray[index],
      Payer: event.target.value,
    });
  };

  const CaseID = (event, index) => {
    updateCaseDataArray(index, {
      ...caseDataArray[index],
      DocumentID: event,
    });
  };

  const handleDateReceived = (event, index) => {
    updateCaseDataArray(index, {
      ...caseDataArray[index],
      PaymentDate: event,
    });
  };

  const CaseNotice_to = (event, index) => {
    updateCaseDataArray(index, {
      ...caseDataArray[index],
      CaseNotice_to: event.target.value,
    });
  };

  const NoticeRef = (event, index) => {
    updateCaseDataArray(index, {
      ...caseDataArray[index],
      NoticeRef: event.target.value,
    });
  };

  const Expenses = (event, index) => {
    updateCaseDataArray(index, {
      ...caseDataArray[index],
      expenses: event.target.value,
    });
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
      const response = await apiService.getbeforecasedocuments();
      setCase(response.data);
      console.log(cases);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [showSweetAlert, setShowSweetAlert] = useState(false);

   
  const postData = async () => {
    try {
      
      const response = await apiService.createnotice(caseDataArray);  
      loaddata()
    } catch (error) {}
  };
  const updateCaseDataArray = (index, updatedData) => {
    setCaseDataArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = { ...updatedData, DocumentID: beforecase_id };
      return newArray;
    });
  };
  const removeCaseData = (index) => {
    setCaseDataArray((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(index, 1);
      return newArray;
    });
  };
  const [numberOfNotices, setNumberOfNotices] = React.useState(1);

  
  const addNewCaseData = () => {
    setCaseDataArray((prevArray) => [
      ...prevArray,
      {
        DocumentID: beforecase_id,
        Payer: "",
        PaymentStatus: "",
        PaymentDate: "",
        expensesType: "",
        expenses_ref: beforecase_id,
        expenses: "",
        // Add other fields as needed
      },
    ]);
  };
  return (
    <div>
        {showSweetAlert && <SweetAlert text="สร้าง Notice สำเร็จ" path="/lawyer/beforecase" />}
      <Grid item container>
        <Grid xs={12} md={8} xl={8}></Grid>
        <Grid xs={12} md={2} xl={2}>
          <Item>
            <Button
              variant="contained"
              onClick={addNewCaseData}
              fullWidth
              color="primary"
            >
              เพิ่ม Notice
            </Button>
          </Item>
        </Grid>

        <Grid xs={12} md={2} xl={2}>
          <Item>
            <Button
              variant="contained"
              onClick={(e) => postData(e)}
              fullWidth
              color="primary"
            >
              ยืนยันข้อมูล
            </Button>
          </Item>
        </Grid>
        <Grid item container>
          {caseDataArray.map((caseData, index) => (
            <>
              <Grid item container key={index}>
                <Grid xs={12} md={12} xl={12}>
                  <Divider>ส่วนที่ {index + 1}</Divider>
                </Grid>

                <Grid xs={12} md={4} xl={4}>
                  <Item>
                    <FormControl fullWidth>
                      <InputLabel id={`payer-label-${index}`}>
                        ผู้ส่ง
                      </InputLabel>
                      <Select
                        labelId={`payer-label-${index}`}
                        value={caseData.Payer}
                        onChange={(e) => Payer(e, index)}
                      >
                        {Employee.map((res) => (
                          <MenuItem
                            key={res.employee_id}
                            value={res.employee_id}
                          >
                            {res.employee_firstname} {res.employee_lastname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid xs={12} md={4} xl={4}>
                  {" "}
                  <Item>
                    <TextField label="TSB Ref." value={beforecase_id} fullWidth></TextField>
                  </Item>
                </Grid>
                <Grid xs={12} md={4} xl={4}>
                  {" "}
                  <Item>
                    <TextField
                      onChange={(e) => CaseNotice_to(e, index)}
                      placeholder="ส่งถึง"
                      fullWidth
                    />
                  </Item>
                </Grid>
                <Grid xs={12} md={4} xl={4}>
                  <Item>
                    {" "}
                    <TextField
                      onChange={(e) => Expenses(e, index)}
                      placeholder="ค่าใช้จ่าย"
                      fullWidth
                    />
                  </Item>
                </Grid>
                <Grid xs={12} md={4} xl={4}>
                  <Item>
                    {" "}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%" }}
                        name={`date-received-${index}`}
                        format="DD-MM-YYYY"
                        value={caseData.PaymentDate}
                        label="วันที่ส่ง"
                        onChange={(e) => handleDateReceived(e, index)}
                      />
                    </LocalizationProvider>
                  </Item>
                </Grid>
                <Grid xs={12} md={4} xl={4}>
                  <Item>
                    {" "}
                    {caseDataArray.length > 1 && (
                      <Button
                        startIcon={<FaTrash />}
                        variant="contained"
                        fullWidth
                        onClick={() => removeCaseData(index)}
                      >
                        ยกเลิกแถว
                      </Button>
                    )}
                  </Item>{" "}
                </Grid>
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default InsertNotice;
