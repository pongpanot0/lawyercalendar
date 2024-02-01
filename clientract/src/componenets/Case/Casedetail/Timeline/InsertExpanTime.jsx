import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/material/styles";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import apiService from "../../../Shared/Apiserver";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const InsertExpanTime = ({ tsb_ref ,loaddata}) => {
  
  const [caseData, setCaseData] = React.useState({
    case_expantime_date: "",
    case_expantime_remark: "",
    tsb_ref: tsb_ref,
  });
  const handletimebar = (event) => {
    setCaseData({
      ...caseData,
      case_expantime_date: event,
    });
  };
  const handelremark = (event) => {
    setCaseData({
      ...caseData,
      case_expantime_remark: event.target.value,
    });
  };
  const postData = async () => {
    try {
      const response = await apiService.creatcaseeExpantime(caseData);
      loaddata()
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Grid item container>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                name="TimeBar"
                label="นัดหมายครั้งถัดไป"
                format="DD-MM-YYYY"
                value={caseData.next_time}
                onChange={handletimebar}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <TextField onChange={handelremark} multiline rows={4} fullWidth />
          </Item>
        </Grid>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <Button onClick={postData} fullWidth variant="contained">
              เพิ่มข้อมูล
            </Button>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default InsertExpanTime;
