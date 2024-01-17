import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Casetype from "../Setting/SettingAdd/Casetype";
import CustomerType from "../Setting/SettingAdd/CustomerType";
import RoleType from "../Setting/SettingAdd/RoleType";
import EmployeeJob from "../Setting/SettingAdd/EmployeeJob";
import SettingBeforeCase from "../Setting/SettingBeforeCase/SettingBeforeCase";
import apiService from "../Shared/Apiserver";
import Employeecasetype from "../Setting/SettingAdd/Employeecasetype";
import ExpensesType from "../Setting/SettingAdd/ExpensesType";
import Insurancetype from "../Setting/SettingAdd/Insurancetype";

const Columncustomertype = [
  {
    field: "customertypes_id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "customertypes_name",
    headerName: "ประเภทลูกค้า",
    width: 200,
  },
];

const Columnbeforecase_type = [
  { field: "beforecase_id", headerName: "ID", width: 70 },
  {
    field: "beforecase_name",
    headerName: "ประเภทการรับเรื่องข้อมูล",
    width: 300,
  },
];
const Columnemployeescasetype = [
  { field: "employeescasetype_id", headerName: "ID", width: 70 },
  {
    field: "employeescasetype_name",
    headerName: "ประเภทพนักงานในคดี",
    width: 200,
  },
];
const ColumnEmployeesType = [
  { field: "employeesjob_id", headerName: "ID", width: 70 },
  {
    field: "employeesjob_name",
    headerName: "ตำแหน่งพนักงาน",
    width: 200,
  },
];
const ColumncaseType = [
  { field: "CaseTypeID", headerName: "ID", width: 70 },
  {
    field: "CaseTypeName",
    headerName: "ประเภทคดี",
    width: 200,
  },
];
const ColumnexpensesType = [
  { field: "expensesType_id", headerName: "ID", width: 70 },
  {
    field: "expensesType_name",
    headerName: "ประเภทการตั้งเบิก",
    width: 200,
  },
];
const ColumninsuranceType = [
  { field: "insurance_type_id", headerName: "ID", width: 70 },
  {
    field: "insurance_type_name",
    headerName: "ประเภทการตั้งเบิก",
    width: 200,
  },
];
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
function Typesetting() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  React.useEffect(() => {
    getDataCasetype();
    getDataCustomertype();
    getDataemployeestype();
    getDatabeforecase();
    getDataemployeesCasetype();
    getDataexpensestype();
    getDatainsuredType();
  }, []);
  const [casetypeData, setcaseTypedata] = React.useState([]);
  const [customertypeData, setcustomertypeData] = React.useState([]);
  const [employeestypeData, setemployeestypeData] = React.useState([]);
  const [beforecaseData, setbeforecaseData] = React.useState([]);
  const [EmployeecaseType, setEmployeecaseType] = React.useState([]);
  const [expensesType, setexpensesType] = React.useState([]);
  const [insuredType,setinsuredType] = React.useState([])
  const getDataCasetype = async () => {
    try {
      const response = await apiService.GetCaseType();
      setcaseTypedata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getDataCustomertype = async () => {
    try {
      const response = await apiService.getCustomerType();
      setcustomertypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getDataemployeestype = async () => {
    try {
      const response = await apiService.getEmployeejob();
      setemployeestypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getDatabeforecase = async () => {
    try {
      const response = await apiService.getbeforecase();
      setbeforecaseData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getDataemployeesCasetype = async () => {
    try {
      const response = await apiService.getEmployeecaseType();
      setEmployeecaseType(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getDataexpensestype = async () => {
    try {
      const response = await apiService.getexpensesType();
      setexpensesType(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getDatainsuredType = async () => {
    try {
      const response = await apiService.getinsuredtype();
      setinsuredType(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const [open, setOpen] = React.useState(false);
  const [setting, setSetting] = React.useState(0);
  const handleClickOpen = (id) => {
    setOpen(true);
    setSetting(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="xl">
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"xs"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {setting === 1 && (
            <div style={{ textAlign: "center" }}>เพิ่มข้อมูลประเภท Case</div>
          )}
          {setting === 2 && (
            <div style={{ textAlign: "center" }}>เพิ่มข้อมูลประเภท ลูกค้า</div>
          )}

          {setting === 4 && (
            <div style={{ textAlign: "center" }}>
              เพิ่มข้อมูลประเภท EmployeeJob
            </div>
          )}
        </DialogTitle>
        {setting === 1 && (
          <div>
            <Casetype />
          </div>
        )}
        {setting === 2 && (
          <div>
            <CustomerType />
          </div>
        )}

        {setting === 4 && (
          <div>
            <EmployeeJob />
          </div>
        )}
        {setting === 5 && (
          <div>
            <SettingBeforeCase />
          </div>
        )}
        {setting === 6 && (
          <div>
            <Employeecasetype />
          </div>
        )}
        {setting === 7 && (
          <div>
            <ExpensesType />
          </div>
        )}
         {setting === 8 && (
          <div>
            <Insurancetype />
          </div>
        )}
      </Dialog>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Case Type Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(1)}>
            Add new
          </Button>

          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={casetypeData}
              columns={ColumncaseType}
              getRowId={(row) => row.CaseTypeID}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Customer Type Setting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(2)}>
            Add new
          </Button>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={customertypeData}
              columns={Columncustomertype}
              getRowId={(row) => row.customertypes_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Employee Job</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(4)}>
            Add new
          </Button>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={employeestypeData}
              columns={ColumnEmployeesType}
              getRowId={(row) => row.employeesjob_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Recive Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(5)}>
            Add new
          </Button>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={beforecaseData}
              columns={Columnbeforecase_type}
              getRowId={(row) => row.beforecase_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>EmployeeCaseType</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(6)}>
            Add new
          </Button>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={EmployeecaseType}
              columns={Columnemployeescasetype}
              getRowId={(row) => row.employeescasetype_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>ExpensesTypeSetting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(7)}>
            Add new
          </Button>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={expensesType}
              columns={ColumnexpensesType}
              getRowId={(row) => row.expensesType_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Insured</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={(e) => handleClickOpen(8)}>
            Add new
          </Button>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={insuredType}
              columns={ColumninsuranceType}
              getRowId={(row) => row.insurance_type_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Typesetting;
