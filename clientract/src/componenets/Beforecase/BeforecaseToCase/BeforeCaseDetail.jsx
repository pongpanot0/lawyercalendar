import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Container, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const BeforeCaseDetail = ({ onBeforeCaseDataSubmit, isplanif }) => {
  const [groupdate, setgroupData] = React.useState("1");

  const [caseData, setCaseData] = React.useState({
    ReciveWarrantDate: "",
    DuedateSummittree: "",
    groupdate: isplanif,
    rednum: "",
    blacknum: "",
    remark: "",
    closetime: "",
    firstmeet: "",
  });

  const handletimebar = (event) => {
    setCaseData({
      ...caseData,
      ReciveWarrantDate: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  const handleclosetimebar = (event) => {
    setCaseData({
      ...caseData,
      closetime: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  const handlefirstmeettimebar = (event) => {
    setCaseData({
      ...caseData,
      firstmeet: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  const handleDueDate = (event) => {
    setCaseData({
      ...caseData,
      DuedateSummittree: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  const handlerednum = (event) => {
    setCaseData({
      ...caseData,
      rednum: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  const handleblacknum = (event) => {
    setCaseData({
      ...caseData,
      blacknum: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  const handleremark = (event) => {
    setCaseData({
      ...caseData,
      remark: event,
    });
    onBeforeCaseDataSubmit(caseData);
  };
  return (
    <>
      {" "}
      <Grid item container>
        {isplanif == 1 && (
          <>
            <Grid xs={12} xl={12} md={12}>
              <Item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    name="TimeBar"
                    label="รับหมาย / ปิดหมายวันที่"
                    format="DD-MM-YYYY"
                    value={caseData.ReciveWarrantDate}
                    onChange={handletimebar}
                  />
                </LocalizationProvider>
              </Item>
            </Grid>
            <Grid xs={12} xl={12} md={12}>
              <Item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    name="TimeBar"
                    label="ครบกำหนด / รับหมายปิดหมาย"
                    format="DD-MM-YYYY"
                    value={caseData.closetime}
                    onChange={handleclosetimebar}
                  />
                </LocalizationProvider>
              </Item>
            </Grid>
            <Grid xs={12} xl={12} md={12}>
              <Item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    name="TimeBar"
                    label="นัดครั้งที่ 1 "
                    format="DD-MM-YYYY"
                    value={caseData.firstmeet}
                    onChange={handlefirstmeettimebar}
                  />
                </LocalizationProvider>
              </Item>
            </Grid>
          </>
        )}
        {isplanif == 2 && (
          <>
            <Grid xs={12} xl={12} md={12}>
              <Item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    name="TimeBar"
                    label="ครบกำหนดปิดหมาย / ครบกำหนดยื่นคำให้การ"
                    format="DD-MM-YYYY"
                    value={caseData.ReciveWarrantDate}
                    onChange={handletimebar}
                  />
                </LocalizationProvider>
              </Item>
            </Grid>
          </>
        )}
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              onChange={(e) => handleblacknum(e.target.value)}
              fullWidth
              label="หมายเลขคดีดำ"
            />
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              onChange={(e) => handlerednum(e.target.value)}
              fullWidth
              label="หมายเลขคดีแดง"
            />
          </Item>
        </Grid>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <TextField
              fullWidth
              onChange={(e) => handleremark(e.target.value)}
              label="รายละเอียดคดี"
              multiline
              rows={5}
            />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default BeforeCaseDetail;
