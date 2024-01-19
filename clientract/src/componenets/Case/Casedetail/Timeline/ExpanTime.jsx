import { Button, Chip, Divider, Grid } from "@mui/material";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InsertExpanTime from "./InsertExpanTime";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import apiService from "../../../Shared/Apiserver";
import dayjs from "dayjs";
const ExpanTime = ({ tsb_ref, loaddata2 }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const loaddata = () => {
    setOpen(false);
    loaddata2();
    getData()
  };
  React.useEffect(() => {
    getData();
  }, []);
  const [caseExpantime,setCaseexpantime] = React.useState([])
  const getData = async () => {
    try {
      const response = await apiService.getcaseeExpantime(tsb_ref);
      console.log(response);
      setCaseexpantime(response.date)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Grid item container>
        <Grid xs={12} xl={8} md={8}></Grid>
        <Grid xs={12} xl={4} md={4}>
          <Button variant="contained" onClick={handleClickOpen} fullWidth>
            {" "}
            เพิ่มข้อมูล{" "}
          </Button>
        </Grid>
        <Grid style={{marginLeft:10}} xs={12} md={10} xl={10}>
          <List sx={{ width: "100%" }}>
            {caseExpantime?.map((value) => (
              <ListItem
                key={value.case_expantime}
                disableGutters
                
               
              >
                <ListItemText secondary={`หมายเหตุ ${value.case_expantime_remark}`} primary={`วันที่ ${dayjs(value.case_expantime_date).format('DD/MM/YYYY')}`} />
                
              </ListItem>
            ))}
          </List>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"ขยายเวลาการยื่นเอกสาร"}
          </DialogTitle>
          <DialogContent>
            <InsertExpanTime tsb_ref={tsb_ref} loaddata={loaddata} />
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default ExpanTime;
