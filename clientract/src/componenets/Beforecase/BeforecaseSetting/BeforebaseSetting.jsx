import { NavLink, useParams } from "react-router-dom";
import apiService from "../../Shared/Apiserver";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "dayjs/locale/th";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { FaClosedCaptioning, FaEdit, FaSeedling } from "react-icons/fa";
import InsertNotice from "../../InsertNotice/InsertNotice";
import { DataGrid } from "@mui/x-data-grid";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const columnNotice = [
  { field: "CaseNotice_ref", headerName: "ID", width: 100 },
  {
    field: "CaseNotice_to",
    headerName: "ส่งถึง",
    width: 200,
  },
  {
    field: "CaseNotice_lawyer_id",
    headerName: "ผู้ส่ง",
    width: 200,
    valueGetter: (params) =>
      `${params.row.employee_firstname || ""} ${
        params.row.employee_lastname || ""
      }`,
  },
  {
    field: "CaseNotice_amount",
    headerName: "ค่าใช้จ่าย",
    width: 100,
  },

];
const BeforebaseSetting = () => {
  const { id } = useParams();
  const [scroll, setScroll] = React.useState("paper");
  const [ClientID, setClientIDData] = React.useState([]);
  const [LawyerID, setLawyerIDData] = React.useState([]);
  const [ReciveType, setReciveTypeData] = React.useState([]);
  const [InsuredType, setInsuredTypeData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getClientID = async () => {
    try {
      const response = await apiService.getcustomer();
      setClientIDData(response.data);
    } catch (error) {}
  };
  const getLawyerID = async () => {
    try {
      const response = await apiService.getEmployee();
      setLawyerIDData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getReciveType = async () => {
    try {
      const response = await apiService.getbeforecase();
      setReciveTypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getInsuredType = async () => {
    try {
      const response = await apiService.getinsuredtype();
      setInsuredTypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getData();
    getClientID();
    getLawyerID();
    getReciveType();
    getInsuredType();
    
  }, []);
  const [noticeData, setNoticeData] = React.useState([]);
 
  const [docstatus, setdocstatus] = React.useState("");

  const getData = async () => {
    try {
      const response = await apiService.getbeforecaseDocumentsbyID(id);
      setCaseData(response.data[0]);
      console.log(response);
     console.log(response.data[0]?.tsb_ref);
      getNotice(response.data[0]?.tsb_ref)
      switch (response.data[0]?.DocumentStatus) {
        case 1:
          // Code to open a new task or perform any action when DocumentStatus is 1
          setdocstatus("เปิดงานใหม่");
          break;

        default:
          // Default case, you can add code here if needed
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getNotice = async (tsb_ref) => {
    try {
      const response = await apiService.getNoticeByDocumentID(tsb_ref);
      console.log(response.data);
      setNoticeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange5 = (event) => {
    setCaseData({
      ...caseData,
      clientID: event.target.value,
    });
  };
  const handleReciveType = (event) => {
    setCaseData({
      ...caseData,
      ReciveType: event.target.value,
    });
  };
  const handleLawyer = (event) => {
    setCaseData({
      ...caseData,
      Lawyer: event.target.value,
    });
  };
  const handleCustomer_ref = (event) => {
    setCaseData({
      ...caseData,
      Customer_ref: event.target.value,
    });
  };
  const handleClainmamount = (event) => {
    setCaseData({
      ...caseData,
      claimamount: event.target.value,
    });
  };
  const handletimebar = (event) => {
    setCaseData({
      ...caseData,
      timebar: event,
    });
  };
  const handleassured = (event) => {
    setCaseData({
      ...caseData,
      assured: event.target.value,
    });
  };
  const handleDateReceived = (event) => {
    console.log(event);
    setCaseData({
      ...caseData,
      DateReceived: event,
    });
  };
  const handleinsurance_type = (event) => {
    console.log(event);
    setCaseData({
      ...caseData,
      insurance_type: event.target.value,
    });
  };

  const [caseData, setCaseData] = useState({
    Receiver: "",
    LawyerID: "", // Added caseType
    clientID: "", // Added clientID
    Customer_ref: "",
    policy_ref: "",
    claimamount: "",
    assured: "",
    timebar: "",
    DateReceived: "",
    insurance_type: "",
  });
  const history = useNavigate();

  const handleClick = () => {
    // Push the data along with the route to ReceiverComponent
    history("/beforecasetocase", { state: caseData });
  };
  const [dis, setDis] = React.useState(true);
  return (
    <div>
      <Grid item container>
        <Grid xs={12} md={2} xl={2}></Grid>
        <Grid xs={12} md={2} xl={2}>
          <Item>
            <Button
              variant="contained"
              onClick={(e) => setDis(!dis)}
              startIcon={<FaEdit />}
              fullWidth
            >
              {" "}
              Edit{" "}
            </Button>{" "}
          </Item>
        </Grid>
        <Grid xs={12} md={2} xl={2}>
          <Item>
            <Button
              variant="contained"
              onClick={(e) => handleClick()}
              startIcon={<FaEdit />}
              fullWidth
            >
              {" "}
              ฟ้อง{" "}
            </Button>{" "}
          </Item>
        </Grid>
        <Grid xs={12} md={4} xl={4}></Grid>
        <Grid xs={12} md={2} xl={2}>
          <Item>
            <Button
              variant="contained"
              startIcon={<FaSeedling />}
              onClick={handleClickOpen}
              fullWidth
            >
              {" "}
              เพิ่ม Notice{" "}
            </Button>{" "}
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Grid item container>
            <Grid xs={12} md={6} xl={6}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  className="TextField"
                  disabled={dis}
                  id=""
                  value={caseData.Customer_ref}
                  onChange={(e) => handleCustomer_ref(e)}
                  type="text"
                  label="Customer_ref"
                />
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  disabled={dis}
                  className="TextField"
                  id=""
                  type="text"
                  value={caseData.assured}
                  onChange={(e) => handleassured(e)}
                  label="assured"
                />
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  disabled={dis}
                  className="TextField"
                  id=""
                  type="number"
                  onChange={(e) => handleClainmamount(e)}
                  value={caseData.claimamount}
                  label="Claim Amount"
                />
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ประเภทประกัน
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseData.insurance_type}
                    label="ประเภทประกัน"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleinsurance_type}
                    required={true}
                    disabled={dis}
                  >
                    {InsuredType.map((res) => {
                      return (
                        <MenuItem value={res.insurance_type_id}>
                          {res.insurance_type_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ClientID
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseData.clientID}
                    label="ClientID"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange5}
                    disabled={dis}
                    required={true}
                  >
                    {ClientID.map((res) => {
                      return (
                        <MenuItem value={res.ClientID}>
                          {res.ClientName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ReciveType
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseData.Receiver}
                    label="Age"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleReciveType}
                    disabled={dis}
                    required={true}
                  >
                    {ReciveType.map((res) => {
                      return (
                        <MenuItem value={res.beforecase_id}>
                          {res.beforecase_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  disabled={dis}
                  className="TextField"
                  id=""
                  type="text"
                  label="DocumentStatus"
                  value={docstatus}
                />
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Lawyer</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseData.LawyerID}
                    label="LawyerID"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleLawyer}
                    disabled={dis}
                    required={true}
                  >
                    {LawyerID.map((res) => {
                      return (
                        <MenuItem value={res.employee_id}>
                          {res.employee_firstname} {res.employee_lastname}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>{" "}
            </Grid>

            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  disabled={dis}
                  className="TextField"
                  id=""
                  type="text"
                  label="DateReceived"
                  onChange={(e) => handleDateReceived(e)}
                  value={dayjs(caseData.DateReceived).format("YYYY-MM-DD")}
                />
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  aria-readonly={true}
                  className="TextField"
                  disabled={dis}
                  id=""
                  type="text"
                  label="timebar"
                  value={dayjs(caseData.timebar).format("YYYY-MM-DD")}
                />
              </Item>{" "}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Grid container item>
            {" "}
            <Grid xs={12} md={12} xl={12}>
              <Item>
                {noticeData.length > 0 && (
                  <DataGrid
                    rows={noticeData}
                    columns={columnNotice}
                    getRowId={(row,index) => row.CaseNotice_id}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                )}
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        maxWidth={"xl"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"เพิ่ม Notice"} </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers={scroll === "paper"}>
          <InsertNotice beforecase_id={id} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BeforebaseSetting;
