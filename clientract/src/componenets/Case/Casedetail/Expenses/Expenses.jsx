import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  Container,
  Divider,
  Grid,
  ListItemAvatar,
  Dialog,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";
import apiService from "../../../Shared/Apiserver";
import dayjs from "dayjs";
import InsertExpenses from "../../../Expenses/InsertExpenses/InsertExpenses";
function Expenses({ caseExpenses }) {
  console.log(caseExpenses);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const loaddata = () =>{
    setOpen(false);
  }
  return (
    <Container maxWidth="xl" >
      <Grid item container>
        <Grid xs={12} md={4} xl={4} mt={2}>
          <Button variant="contained" fullWidth onClick={handleClickOpen}>
            เพิ่มค่าใช้จ่าย
          </Button>
        </Grid>
        <Grid  xs={12} md={12} xl={12}>
          <List style={{maxHeight: '70vh', overflow: 'auto',width:'100%'}}>
            {caseExpenses.map((value) => (
              <>
                <ListItem
                  key={value.id}
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label="comment">
                      <CommentIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${value.expensesType_name}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body5"
                        >
                          โดย {value.name}
                        </Typography>
                        <br></br>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body5"
                        >
                          เมื่อวันที่{" "}
                          {dayjs(value.CaseNotice_senddate).format(
                            "DD/MM/YYYY"
                          )}{" "}
                          <br />
                          จำนวนเงิน {value.expenses}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <InsertExpenses loaddata={loaddata}/>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Expenses;
