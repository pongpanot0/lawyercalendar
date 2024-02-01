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
import CloseBeforecase from "./CloseBeforecase";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const columnNotice = [
  { field: "CaseNotice_ref", headerName: "TSB Ref.", width: 100 },
  {
    field: "CaseNotice_to",
    headerName: "ส่งถึง",
    width: 200,
    valueGetter: (params) => {
      if (params.row.CaseNotice_to !== "undefined") {
        return params.row.CaseNotice_to;
      } else {
        return "ยังไม่ได้เพิ่มผู้ส่ง";
      }
    },
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
  {
    field: "CaseNotice_iswait",
    headerName: "สถานะ Notice",
    width: 200,
    valueGetter: (params) => {
      switch (params.row.CaseNotice_iswait) {
        case 0:
          return "ออก Notice แล้ว";
        case 1:
          return "รอออก Notice";
        default:
          break;
      }
    },
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
  const loaddata = () => {
    getNotice(tsbref);
    getData();
    setOpen(false);
    setOpen3(false);
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
  const [tsbref, settsbref] = React.useState("");
  const [gridStatus, setGridstatus] = React.useState(6);
  const getData = async () => {
    try {
      const response = await apiService.getbeforecaseDocumentsbyID(id);
      console.log(response);

      getcustomerresponses(response.data[0]?.clientID);
      setCaseData(response.data[0]);
      getNotice(response.data[0]?.tsb_ref);
      settsbref(response.data[0]?.tsb_ref);

      switch (response.data[0]?.isplanif) {
        case 1:
          return setGridstatus(6);
        case 2:
          return setGridstatus(12);

        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getNotice = async (tsb_ref) => {
    try {
      const response = await apiService.getNoticeByDocumentID(tsb_ref);
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
      LawyerID: event.target.value,
    });
    console.log(event.target.value);
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
    customer_reponsive: "",
    tsb_ref: "",
    case_documentstatus: "",
  });
  const history = useNavigate();
  const update = async () => {
    try {
      const response = await apiService.updateBeforecase(caseData);
      getData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const [cusresponse, setcusresponse] = React.useState([]);
  const getcustomerresponses = async () => {
    try {
      const response = await apiService.customerresponses();
      console.log(response.data);
      setcusresponse(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    // Push the data along with the route to ReceiverComponent
    history("/beforecasetocase", { state: caseData });
  };
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const updatedata = async () => {
    try {
      const response = await apiService.CreateBeforeUpdatecase(caseData.tsb_ref);
      getData()
    } catch (error) {
      console.log(error.message);
    }
   
  };
  const [dis, setDis] = React.useState(true);
  return (
    <div>
      <Grid item container>
        <Grid xs={12} md={2} xl={2}>
          {dis == false && (
            <Item>
              <Button
                variant="contained"
                onClick={(e) => update()}
                startIcon={<FaEdit />}
                fullWidth
              >
                {" "}
                Update{" "}
              </Button>{" "}
            </Item>
          )}
        </Grid>
        {caseData.case_documentstatus == 2 && <></>}
        <Grid xs={12} md={2} xl={2}>
          {caseData.case_documentstatus !== 2 && (
            <>
              <Item>
                <Button
                  variant="contained"
                  onClick={(e) => handleClick()}
                  startIcon={<FaEdit />}
                  fullWidth
                >
                  {" "}
                  อัพเดทฟ้อง{" "}
                </Button>{" "}
              </Item>
            </>
          )}
        </Grid>

        <Grid xs={12} md={1} xl={1}>
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
        <Grid xs={12} md={1} xl={1}>
          <Item>
            {caseData.isclose == 0 && (
              <Button
                variant="contained"
                onClick={handleClickOpen3}
                startIcon={<FaEdit />}
                fullWidth
                color="error"
              >
                {" "}
                ปิดงาน
              </Button>
            )}
            {caseData.isclose == 1 && (
              <Button
                variant="contained"
                onClick={updatedata}
                startIcon={<FaEdit />}
                fullWidth
                color="primary"
              >
                {" "}
                เปิดงาน
              </Button>
            )}
          </Item>
        </Grid>
        <Dialog
          open={open3}
          onClose={handleClose3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <CloseBeforecase caseid={caseData.tsb_ref} loaddata={loaddata} />
          </DialogContent>
        </Dialog>
        <Grid xs={12} md={4} xl={4}></Grid>
        {caseData.isplanif == 1 && (
          <Grid xs={12} md={2} xl={2}>
            <Item>
              <Button
                variant="contained"
                startIcon={<FaSeedling />}
                onClick={handleClickOpen}
                fullWidth
              >
                {" "}
                อัพเดท Notice{" "}
              </Button>{" "}
            </Item>
          </Grid>
        )}

        <Grid xs={12} md={gridStatus} xl={gridStatus}>
          <Grid item container>
            <Grid xs={12} md={6} xl={6}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  className="TextField"
                  disabled={true}
                  id=""
                  value={caseData.tsb_ref}
                  type="text"
                  label="TSB Ref."
                />
              </Item>{" "}
            </Grid>
            <Grid xs={12} md={6} xl={6}>
              {" "}
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ผู้ส่งมอบงาน
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseData.customer_reponsive}
                    label="ทนายผู้รับเอกสาร"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleLawyer}
                    disabled={dis}
                    required={true}
                  >
                    {cusresponse.map((res) => {
                      return (
                        <MenuItem value={res.customer_responses_id}>
                          {res.customer_responses_firstname}{" "}
                          {res.customer_responses_lastname}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>{" "}
            </Grid>
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
                  label="Claim No."
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
                  label="ผู้รับประกัน"
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
                  <InputLabel id="demo-simple-select-label">ลูกค้า</InputLabel>
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
                    ประเภทการรับเอกสาร
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
            <Grid xs={12} md={12} xl={12}>
              {" "}
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ทนายผู้รับเอกสาร
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={caseData.LawyerID}
                    label="ทนายผู้รับเอกสาร"
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
                  label="วันที่ได้รับเอกสาร"
                  onChange={(e) => handleDateReceived(e)}
                  value={dayjs(caseData.DateReceived).format("DD/MM/YYYY")}
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
                  label="Timebar"
                  value={dayjs(caseData.timebar).format("DD/MM/YYYY")}
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
                    getRowId={(row, index) => row.CaseNotice_id}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
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
        <DialogTitle id="alert-dialog-title">{"อัพเดท Notice"} </DialogTitle>
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
          <InsertNotice beforecase_id={tsbref} loaddata={loaddata} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BeforebaseSetting;
