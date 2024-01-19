import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArticleIcon from "@mui/icons-material/Article";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateEmployee from "./create-employee/CreateEmployee";
import apiService from "../Shared/Apiserver";
import { styled } from "@mui/material/styles";
const Item = styled("div")(({ theme }) => ({
  
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Employee() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employeeData, setemployeeData] = React.useState([]);
  React.useEffect(() => {
    getEmployeesData();
  }, []);
  const loaddata = () =>{
    getEmployeesData()
    setOpen(false)
  }
  const getEmployeesData = async () => {
    try {
      const response = await apiService.getEmployee();
      setemployeeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Paper elevation={7}>
        <Grid container item>
          <Grid xs={4} md={4} xl={4}>
            <Item>
              <Button
                variant="contained"
                onClick={(e) => handleOpen(e)}
                fullWidth
                color="primary"
              >
                Add Employee
              </Button>
            </Item>
          </Grid>
          <Grid xs={12} md={12} xl={12}>
            <List
              sx={{
                width: "100%",
                
             
              }}
            >
              {employeeData.map((res) => {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`คุณ ${res.employee_firstname} ${res.employee_lastname}`}
                        
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" color="primary" />
                  </>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"เพิ่มข้อมูลพนักงาน"}
          </DialogTitle>
          <DialogContent>
            <CreateEmployee loaddata={loaddata}/>
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
}

export default Employee;
