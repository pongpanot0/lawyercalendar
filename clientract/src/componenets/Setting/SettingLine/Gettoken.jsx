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
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const Gettoken = () => {
  React.useEffect(() => {
    getPersondata();
  }, []);
  const [person, setPerson] = React.useState([]);
  const getPersondata = async () => {
    try {
      const response = await apiService.getProfile();
      console.log(response);
      setPerson(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const TimePic = (e) => {
    console.log(e);
  };
  const [selectedTime, setSelectedTime] = React.useState(new Date());

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const clientId = "B2SDUcej5I0rIBAK0CPhfE";
  const redirectUrl = "http://localhost:3000/lawyer/Testsendline";
  const state = `${person.employee_id}`;

  const authorizationUrl = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=notify&state=${state}`;
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={12} md={12} xl={12}>
                <Typography variant="h5" gutterBottom>
                  <Item>ข้อมูลส่วนตัว</Item>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
                    label="ชื่อ"
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_firstname}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
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
                    label="อีเมลล์"
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_email}
                  />{" "}
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={6} xl={6}>
                <Item>
                  {" "}
                  <TextField
                    label="เบอร์โทรศัพท์"
                    InputLabelProps={{ shrink: true }}
                    value={person.employee_phone}
                  />{" "}
                </Item>
              </Grid>
              {person.employee_linetoken !== undefined && (
                <>
                  <Grid item xs={12} md={12} xl={12}>
                    <Item>
                      <Typography>ตั้งค่าแจ้งเตือนผ่านไลน์เรียบร้อย</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Item>
                      <TextField type="password" fullWidth value={person.employee_linetoken} />
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
