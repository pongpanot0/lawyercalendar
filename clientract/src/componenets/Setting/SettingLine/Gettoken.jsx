import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import apiService from "../../Shared/Apiserver";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import SweetAlert from "../../Shared/SweetAlrt";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const Gettoken = () => {
  React.useEffect(() => {
    getPersondata();
  }, []);
  const [person, setPerson] = React.useState({
    employee_firstname: "",
    employee_lastname: "",
    employee_phone: "",
    employee_email: "",
  });

  const getPersondata = async () => {
    try {
      const response = await apiService.getProfile();

      setPerson(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (fieldName) => (event) => {
    setPerson({ ...person, [fieldName]: event.target.value });
  };

  const [edit, setEdit] = React.useState(true);
  const clientId = "B2SDUcej5I0rIBAK0CPhfE";
  const redirectUrl = "http://localhost:3000/lawyer/Testsendline";
  const state = `${person.employee_id}`;
  const [showSweetAlert, setShowSweetAlert] = React.useState(false);
  const postEdit = async () => {
    try {
      const response = await apiService.editProfile(person);
      setShowSweetAlert(true);
      setEdit(false)
    } catch (error) {
      console.log(error.message);
    }
  
  };
  const authorizationUrl = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=notify&state=${state}`;
  return (
    <Container maxWidth="xl">
      {showSweetAlert && (
        <SweetAlert
          text="แก้ไขข้อมูลส่วนตัวสำเร็จ"
          path="/setting"
        />
      )}
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={6} md={6} xl={6} style={{ textAlign: "start" }}>
                <Typography variant="h5" gutterBottom>
                  <Item>ข้อมูลส่วนตัว </Item>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} xl={6} style={{ textAlign: "end" }}>
                <Typography variant="h5" gutterBottom>
                  <Item>
                    {edit == true && (
                      <>
                        <Button
                          color="primary"
                          onClick={(e) => setEdit(!edit)}
                          variant="contained"
                        >
                          แก้ไขข้อมูลส่วนตัว{" "}
                        </Button>
                      </>
                    )}
                    {edit == false && (
                      <>
                        <Button
                          color="primary"
                          onClick={(e) => postEdit(!edit)}
                          variant="contained"
                        >
                          บันทึก{" "}
                        </Button>
                      </>
                    )}
                  </Item>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
                    disabled={edit}
                    label="ชื่อ"
                    onChange={handleChange("employee_firstname")}
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_firstname}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
                    disabled={edit}
                    onChange={handleChange("employee_lastname")}
                    label="นามสกุล"
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_lastname}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
                    disabled={edit}
                    label="อีเมลล์"
                    onChange={handleChange("employee_email")}
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_email}
                  />{" "}
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
                    disabled={edit}
                    label="เบอร์โทรศัพท์"
                    onChange={handleChange("employee_phone")}
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_phone}
                  />{" "}
                </Item>
              </Grid>
              {person.employee_linetoken !== null && (
                <>
                  <Grid item xs={12} md={12} xl={12}>
                    <Item>
                      <Typography>ตั้งค่าแจ้งเตือนผ่านไลน์เรียบร้อย</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Item>
                      <TextField
                        type="password"
                        fullWidth
                        value={person.employee_linetoken}
                      />
                    </Item>
                  </Grid>
                </>
              )}
              {person.employee_linetoken == undefined && (
                <>
                  <Grid item xs={12} md={6} xl={6}>
                    <Item>ตั้งค่าการแจ้งเตือนผ่านไลน์</Item>
                  </Grid>
                  <Grid item xs={12} md={6} xl={6}>
                    <Link to={authorizationUrl}>
                      <Button color="primary" fullWidth variant="contained">
                        ตั้งค่าแจ้งเตือนผ่านไลน์
                      </Button>
                    </Link>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Gettoken;
