import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import apiService from "../../../Shared/Apiserver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const InsertTimeline = ({ id,onClose }) => {
  const [timelineTypeData, settimelineTypeData] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const [timelineData, setTimelineData] = React.useState({
    case_timebar_status: "",
    case_timebar_incoming: "",
    case_timeline_detail: "",
    case_id:id,
  });
  const getData = async () => {
    try {
      const response = await apiService.gettimelimetype();
      console.log(response);
      settimelineTypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handletimebar = (event) => {
    setTimelineData({
      ...timelineData,
      case_timebar_incoming: event,
    });
  };
  const handlestatus = (event) => {
    setTimelineData({
      ...timelineData,
      case_timebar_status: event.target.value,
    });
  };
  const handleremark = (event) => {
    setTimelineData({
      ...timelineData,
      case_timeline_detail: event.target.value,
    });
  };
  const postData = async () => {
    try {
      const response = await apiService.createcaseTimeline(timelineData);
      console.log(response);
      onClose();
    } catch (error) {
        console.log(error.message);
    }
  };
  return (
    <Container maxWidth={"xl"}>
      <Grid item container>
        <Grid xs={12} md={6} lg={6}>
          <Item>
            <FormControl fullWidth>
              <InputLabel id={`demo-simple-select-label`}>
                เลือกสถานะ
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label-`}
                id={`demo-simple-select-`}
                label="เลือกสถานะ"
                value={timelineData.case_timebar_status}
                onChange={handlestatus}
              >
                {timelineTypeData.map((res) => {
                  return (
                    <MenuItem value={res.timeline_status_id}>
                      {res.timeline_status_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                name="TimeBar"
                label="นัดหมายครั้งถัดไป"
                format="DD-MM-YYYY"
                value={timelineData.incomingdate}
                onChange={handletimebar}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <Item>
            <TextField
              multiline
              value={timelineData.case_timeline_detail}
              rows={4}
              label="หมายเหตุ"
              onChange={handleremark}
              fullWidth
            />
          </Item>
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <Item>
            <Button
              onClick={postData}
              color="primary"
              fullWidth
              variant="contained"
            >
              เพิ่มข้อมูล
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InsertTimeline;
