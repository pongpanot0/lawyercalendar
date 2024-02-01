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
const TimelineDetail = ({ id, loaddata }) => {
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
  const [case_timeline_id, settcase_timeline_id] = React.useState([]);
  const [case_ids, setcase_ids] = React.useState("");
  const getDAta = async (id) => {
    try {
      const response = await apiService.gettask(id.case_timeline_id);

      settodolistData(response.data);
      setcase_ids(id.case_id);

      settcase_timeline_id(id.case_timeline_id);

      setOpen2(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDataBeforeFromCaseEmployee = async (data) => {
    // Handle the data received from CaseEmployee
    getData();
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

      // Now update the todolistData state in the parent component
      const updatedData = await apiService.gettask(taskId);
      console.log(updatedData);
      settodolistData(updatedData.data);
      getData(id);
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
          console.log(res);
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
                      onClick={(e) =>
                        handleClickOpen2(res, res.case_timeline_id)
                      }
                    >
                      {" "}
                      TODO LIST: {res.case_todolist_sucess_1_count}/
                      {res.total_count}
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
            case_timeline_id={case_timeline_id}
            case_ids={case_ids}
            onCheckboxChange={handleCheckboxChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimelineDetail;
