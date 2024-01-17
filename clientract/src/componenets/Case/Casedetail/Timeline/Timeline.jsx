import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import InsertTimeline from "./InsertTimeline";
import apiService from "../../../Shared/Apiserver";
import dayjs from "dayjs";
import Tasklist from "./Tasklist";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TimelineDetail = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [idtotask, setidtotask] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = (id) => {
    getDAta(id);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [todolistData, settodolistData] = React.useState([]);
  const getDAta = async (id) => {
    try {
      const response = await apiService.gettask(id.case_timeline_id);
      settodolistData(response.data);
      setOpen2(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDataBeforeFromCaseEmployee = (data) => {
    // Handle the data received from CaseEmployee

    setOpen(!open);
  };

  React.useEffect(() => {
    getData();
  }, []);
  const [timelineData, setTimelineData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await apiService.getcaseTimeline(id);
      setTimelineData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCheckboxChange = async (taskId) => {
    try {
      // Your existing code for updating the task data
      // ...
      console.log(taskId);
      // Now update the todolistData state in the parent component
      const updatedData = await apiService.gettask(taskId);
      console.log(updatedData);
      settodolistData(updatedData.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div>
      <Grid item container>
        <Grid xs={12} md={9} xl={9}></Grid>
        <Grid xs={12} md={3} xl={3}>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            fullWidth
            color="primary"
          >
            เพิ่มข้อมูล{" "}
          </Button>
        </Grid>
      </Grid>
      <Timeline position="alternate">
        {timelineData.map((res) => {
          return (
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {dayjs(res.case_timebar_incoming).format("DD/MM/YYYY")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body3">
                      {res.timeline_status_name}
                    </Typography>
                    <br></br>

                    <Typography variant="body5">
                      {res.case_timeline_detail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      onClick={(e) => handleClickOpen2(res)}
                    >
                      {" "}
                      TODO LIST: 10/10
                    </Button>
                  </CardActions>
                </Card>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"เพิ่มสถานะงาน"}</DialogTitle>
        <DialogContent>
          <InsertTimeline id={id} onClose={handleDataBeforeFromCaseEmployee} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"เพิ่มสถานะงาน"}</DialogTitle>
        <DialogContent>
          <Tasklist
          
            todolistData={todolistData}
           
            onCheckboxChange={handleCheckboxChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimelineDetail;