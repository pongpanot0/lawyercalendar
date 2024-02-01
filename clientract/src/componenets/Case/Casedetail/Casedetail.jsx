import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "../create-case/CheckDetails.css";
import { styled } from "@mui/material/styles";
import Notice from "./Notice/Notice";
import Expenses from "./Expenses/Expenses";
import apiService from "../../Shared/Apiserver";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import "./Casedetail.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineDetail from "./Timeline/Timeline";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import { FaBusinessTime } from "react-icons/fa6";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import dayjs from "dayjs";
import ExpanTime from "./Timeline/ExpanTime";
import CloseCase from "./CloseCase";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

function Casedetail() {
  const { id } = useParams();
  const [showform, setshowform] = React.useState(1);
  const [caseData, setCaseData] = React.useState([]);
  React.useEffect(() => {
    getData();
    getEmployeesData();
    getemploycasetypeData();
  }, []);
  const [caseLawyer, setCaseLawyer] = React.useState([]);
  const [CaseNotices, setCaseNotices] = React.useState([]);
  const [caseExpenses, setcaseExpensesr] = React.useState([]);
  const [casePanif, setcasePanif] = React.useState([]);
  const [caseDefendant, setcaseDefendant] = React.useState([]);
  const [caseCompliner, setcaseCompliner] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);
  const [isHovered3, setIsHovered3] = React.useState(false);
  const [isHovered4, setIsHovered4] = React.useState(false);
  const [panif, setPanif] = React.useState("");
  const [expencliam, setexpenclam] = React.useState("");
  const loaddata = async () => {
    getData();
    setOpen(false);
  };
  const loaddata2 = async () => {
    getData();
  };
  const [employeesData, setEmployeesData] = React.useState([]);
  const [employeescasetype, setEmployeescasetypeData] = React.useState([]);
  const getEmployeesData = async () => {
    try {
      const response = await apiService.getEmployee();
      setEmployeesData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getemploycasetypeData = async () => {
    try {
      const response = await apiService.getEmployeecaseType();
      setEmployeescasetypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async () => {
    try {
      const response = await apiService.getCaseByid(id);
      setCaseData(response.data[0]);
      setCaseLawyer(response.caseLawyer);

      setcaseExpensesr(response.caseExpenses);
      setCaseNotices(response.CaseNotices);
      setcasePanif(response.querygetplanif);
      setcaseDefendant(response.querygetdefendant);
      setcaseCompliner(response.querygetcase_complinant);
      const formattedClaimAmount = Number(
        response.data[0].claimAmount
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setexpenclam(formattedClaimAmount);

      if (response.data[0].plaintiff_type == 1) {
        return setPanif("เป็นโจทก์");
      }
      if (response.data[0].plaintiff_type == 2) {
        return setPanif(`เป็นจำเลย`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const update = async () => {
    try {
      const response = await apiService.updateOpencase(caseData.tsb_ref);
      getData()
    } catch (error) {
      console.log(error.message);
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className="scrollbar" id="style-1" maxWidth="xl">
      <div className="force-overflow">
        <Grid item container mt={5}>
          <Grid xs={12} xl={2} md={2}>
            <Item>
              {caseData.case_close == 0 && (
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="error"
                  fullWidth
                >
                  ปิดคดี
                </Button>
              )}
              {caseData.case_close == 1 && (
                <Button
                  onClick={update}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  เปิดคดีใหม่
                </Button>
              )}
            </Item>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <CloseCase caseid={caseData.tsb_ref} loaddata={loaddata} />
            </DialogContent>
          </Dialog>
          <Grid xs={12} xl={2} md={2}>
            <Item></Item>
          </Grid>
          <Grid xs={12} xl={8} md={8}></Grid>
          <Grid xs={12} md={7} xl={7}>
            <Grid item container>
              <Grid xs={12} xl={4} md={4}>
                <Item>
                  <TextField
                    aria-readonly={true}
                    InputLabelProps={{ shrink: true }}
                    className="TextField"
                    id=""
                    label="หมายเลขแดง"
                    value={caseData.rednum}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={4} md={4}>
                <Item>
                  <TextField
                    aria-readonly={true}
                    InputLabelProps={{ shrink: true }}
                    className="TextField"
                    id=""
                    label="หมายเลขดำ"
                    value={caseData.blacknum}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={4} md={4}>
                <Item>
                  <TextField
                    aria-readonly={true}
                    InputLabelProps={{ shrink: true }}
                    className="TextField"
                    id=""
                    disabled
                    label="TSB Ref."
                    value={caseData.tsb_ref}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                {" "}
                <Item>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    aria-readonly={true}
                    className="TextField"
                    id=""
                    label="ลูกค้า"
                    value={caseData.ClientName}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    InputLabelProps={{ shrink: true }}
                    className="TextField"
                    id=""
                    label="Claim No."
                    value={caseData.Customer_ref}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    className="TextField"
                    InputLabelProps={{ shrink: true }}
                    id=""
                    label="Claim Amount"
                    value={expencliam}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    className="TextField"
                    InputLabelProps={{ shrink: true }}
                    id=""
                    label="ประเภทคดี"
                    value={caseData.CaseTypeName}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    InputLabelProps={{ shrink: true }}
                    className="TextField"
                    id=""
                    label="ประเภทประกันภัย"
                    value={caseData.insurance_type}
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={6} md={6}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    className="TextField"
                    InputLabelProps={{ shrink: true }}
                    id=""
                    label="ประเภท"
                    value={panif}
                  />
                </Item>
              </Grid>

              <Grid xs={12} xl={12} md={12}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    className="TextField"
                    InputLabelProps={{ shrink: true }}
                    id=""
                    label="ครบกำหนดปิดหมาย / วันที่ครบกำหนดยื่นคำให้การ "
                    value={
                      caseData.ReciveWarrantDate
                        ? dayjs(caseData.ReciveWarrantDate).format("DD/MM/YYYY")
                        : ""
                    }
                  />
                </Item>
              </Grid>
              <Grid xs={12} xl={12} md={12}>
                {" "}
                <Item>
                  <TextField
                    aria-readonly={true}
                    className="TextField"
                    multiline
                    rows={4}
                    InputLabelProps={{ shrink: true }}
                    id=""
                    label="รายละเอียดคดี"
                    value={caseData.case_remark}
                  />
                </Item>
              </Grid>

              <Grid xs={12} xl={12} md={12}>
                <Item> รายชื่อผู้รับผิดชอบ</Item>
              </Grid>
              {caseLawyer.map((res) => {
                return (
                  <Grid container>
                    <Grid xs={12} xl={6} md={6}>
                      <Item>
                        <TextField
                          className="TextField"
                          id=""
                          label="ทนาย"
                          value={res.name}
                          InputLabelProps={{ shrink: true }}
                          aria-readonly={true}
                        />
                      </Item>
                    </Grid>
                    <Grid xs={12} xl={6} md={6}>
                      <Item>
                        <TextField
                          className="TextField"
                          id=""
                          label="ประเภท"
                          aria-readonly={true}
                          InputLabelProps={{ shrink: true }}
                          value={res.employeescasetype_name}
                        />
                      </Item>
                    </Grid>
                  </Grid>
                );
              })}

              {casePanif.length > 0 && (
                <>
                  <Grid xs={12} xl={12} md={12}>
                    <Item> รายชื่อโจทก์</Item>
                  </Grid>
                  {casePanif.map((res, index) => {
                    return (
                      <Grid container>
                        <Grid xs={12} xl={12} md={12}>
                          <Item>
                            <TextField
                              className="TextField"
                              id=""
                              label={`โจทก์ที่ ${index + 1}`}
                              value={res.case_plainiff_firstname}
                              InputLabelProps={{ shrink: true }}
                              aria-readonly={true}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              )}

              {caseDefendant.length > 0 && (
                <>
                  <Grid xs={12} xl={12} md={12}>
                    <Item> รายชื่อจำเลย</Item>
                  </Grid>
                  {caseDefendant.map((res, index) => {
                    return (
                      <Grid container>
                        <Grid xs={12} xl={12} md={12}>
                          <Item>
                            <TextField
                              className="TextField"
                              id=""
                              label={`จำเลยที่ ${index + 1}`}
                              value={res.case_defendant_firstname}
                              InputLabelProps={{ shrink: true }}
                              aria-readonly={true}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              )}

              {caseCompliner.length > 0 && (
                <>
                  <Grid xs={12} xl={12} md={12}>
                    <Item> รายชื่อผู้ร้อง</Item>
                  </Grid>
                  {caseCompliner.map((res, index) => {
                    return (
                      <Grid container>
                        <Grid xs={12} xl={12} md={12}>
                          <Item>
                            <TextField
                              className="TextField"
                              id=""
                              label={`ผู้ร้องที่ ${index + 1}`}
                              value={res.case_complainant_name}
                              InputLabelProps={{ shrink: true }}
                              aria-readonly={true}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={12} md={5} xl={5}>
            <Grid item container>
              <Grid xs={12} md={12} xl={12}>
                <Item>
                  <Stack direction={"row"} spacing={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => setshowform(1)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{
                        width: isHovered || showform == 1 ? "100%" : "auto",
                        transition: "width 0.3s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      sx={{
                        ":active": {
                          width: "100%",
                          transition: "width 0.3s ease-in-out",
                        },
                      }}
                    >
                      <SendIcon />

                      {(isHovered || showform === 1) && <span>Notice</span>}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => setshowform(2)}
                      onMouseEnter={() => setIsHovered2(true)}
                      onMouseLeave={() => setIsHovered2(false)}
                      style={{
                        width: isHovered2 || showform == 2 ? "100%" : "auto",
                        transition: "width 3s 10.5s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      sx={{
                        ":active": {
                          width: "100%",
                          transition: "width 0.3s ease-in-out",
                        },
                      }}
                    >
                      <AttachMoneyIcon />
                      {(isHovered2 || showform === 2) && (
                        <span>ค่าใช้จ่าย</span>
                      )}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => setshowform(3)}
                      onMouseEnter={() => setIsHovered3(true)}
                      onMouseLeave={() => setIsHovered3(false)}
                      style={{
                        width: isHovered3 || showform == 3 ? "100%" : "auto",
                        transition: "width 0.3s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      sx={{
                        ":active": {
                          width: "100%",
                          transition: "width 0.3s ease-in-out",
                        },
                      }}
                    >
                      <ViewTimelineIcon />
                      {(isHovered3 || showform === 3) && <span>Timeline</span>}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => setshowform(4)}
                      onMouseEnter={() => setIsHovered4(true)}
                      onMouseLeave={() => setIsHovered4(false)}
                      style={{
                        width: isHovered4 || showform == 4 ? "100%" : "auto",
                        transition: "width 0.3s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      sx={{
                        ":active": {
                          width: "100%",
                          transition: "width 0.3s ease-in-out",
                        },
                      }}
                    >
                      <FaBusinessTime />
                      {(isHovered4 || showform === 4) && <span>ขยายเวลา</span>}
                    </Button>
                  </Stack>
                </Item>
              </Grid>

              <Grid xs={12} md={12} xl={12}>
                {showform == 1 && <Notice CaseNotices={CaseNotices} />}
                {showform == 2 && (
                  <Expenses caseExpenses={caseExpenses} loaddata2={loaddata2} />
                )}
                {showform == 3 && (
                  <TimelineDetail
                    id={id}
                    caseExpenses={caseExpenses}
                    loaddata={loaddata}
                  />
                )}
                {showform == 4 && (
                  <ExpanTime
                    id={id}
                    tsb_ref={id}
                    caseExpenses={caseExpenses}
                    loaddata2={loaddata2}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Casedetail;
