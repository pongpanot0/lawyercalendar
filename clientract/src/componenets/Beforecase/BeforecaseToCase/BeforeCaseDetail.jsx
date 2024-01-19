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
const BeforeCaseDetail = ({ onBeforeCaseDataSubmit }) => {
  const [groupdate, setgroupData] = React.useState("1");
 
  const [caseData, setCaseData] = React.useState({
    ReciveWarrantDate: "",
    DuedateSummittree: "",
    groupdate:groupdate,
    rednum: "",
    blacknum: "",
    remark: "",
  });
  const onChange = (e) => {
  
    setCaseData({
      ...caseData,
      groupdate: e.target.value,
    });
 
    onBeforeCaseDataSubmit(groupdate);
  };
  const handletimebar = (event) => {
    setCaseData({
      ...caseData,
      ReciveWarrantDate: event,
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
        <Grid xs={12} xl={12} md={12}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => onChange(e)}
              value={caseData.groupdate}
            >
              <FormControlLabel
                defaultChecked={true}
                value="1"
                control={<Radio />}
                label="โจทก์"
              />
              <FormControlLabel value="2" control={<Radio />} label="จำเลย" />
            </RadioGroup>
          </FormControl>
        </Grid>

      
          <Grid xs={12} xl={4} md={4}>
            <Item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  name="TimeBar"
                  label="ครบกำหนดปิดหมาย / วันที่ครบกำหนดยื่นคำให้การ"
                  format="DD-MM-YYYY"
                  value={caseData.ReciveWarrantDate}
                  onChange={handletimebar}
                />
              </LocalizationProvider>
            </Item>
          </Grid>
        
        
        <Grid xs={12} md={4} xl={4}>
          <Item>
            <TextField onChange={e=>handleblacknum(e.target.value)} fullWidth label="หมายเลขคดีดำ" />
          </Item>
        </Grid>
        <Grid xs={12} md={4} xl={4}>
          <Item>
            <TextField onChange={e=>handlerednum(e.target.value)} fullWidth label="หมายเลขคดีแดง" />
          </Item>
        </Grid>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <TextField
              fullWidth
              onChange={e=>handleremark(e.target.value)}
              label="รายละเอียดเพิ่มเติม"
              multiline
              rows={4}
            />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default BeforeCaseDetail;
