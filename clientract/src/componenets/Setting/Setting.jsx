import React, { useState } from "react";
import {
  Button,
  Card,
  Fab,
  Grid,
  Paper,
  Typography,
  TextField,
  Container,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material/styles";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Employee from "../Employee/Employee";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ColorPicker from "../Shared/ColorPicker";

import ArticleIcon from "@mui/icons-material/Article";
import Typesetting from "../Typesetting/Typesetting";

import Gettoken from "./SettingLine/Gettoken";
import SettingBeforeCase from "./SettingBeforeCase/SettingBeforeCase";
import apiService from "../Shared/Apiserver";
import Insurancetype from "./SettingAdd/Insurancetype";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
function Setting({ loaddata }) {
  const [show, setShow] = React.useState(1);

  const buttons = [
    {
      icon: <SettingsIcon style={{ fontSize: 80 }} />,
      show: 1,
      text: "ตั้งค่าข้อมูลสี",
    },
    {
      icon: <AccountBoxIcon style={{ fontSize: 80 }} />,
      show: 5,
      text: "ข้อมูลส่วนตัว",
    },

    {
      icon: <ArticleIcon style={{ fontSize: 80 }} />,
      show: 3,
      text: "ตั้งค่าข้อมูล ประเภท",
    },
  /*   {
      icon: <PersonAddIcon style={{ fontSize: 80 }} />,
      show: 2,
      text: "เพิ่มพนักงาน",
    }, */
  ];

  const [fontSize, setFontSize] = useState(20);
  const [primaryColor, setPrimaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [fontButtonColor, setFontButtonColor] = useState("");
  const [dangerColor, setDangerColor] = useState("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  const handleClick = (showValue) => {
    setShow(showValue);
  };
  const handleChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleColorChange = (color, setter) => {
    setter(color);
  };

  React.useEffect(() => {
    getData();
  }, []);
  const postdata = async (e) => {
    try {
      const data = {
        settingsusers_primarybutton: accentColor,
        settingsusers_cancelbutton: dangerColor,
        settingsusers_fontsize: fontSize,
        settingsusers_fontcolor: fontColor,
        settingsusers_primarycolor: primaryColor,
        settingsusers_fontButtonColor: fontButtonColor,
        settingsusers_backgroundcolor: BackgroundColor,
        settingsusers_user_id: 1,
      };

      const response = await apiService.createsetting(data);
      loaddata();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await apiService.getsetting(1);
  
      setFontSize(response.data[0]?.settingsusers_fontsize);
      setPrimaryColor(response.data[0]?.settingsusers_primarycolor);
      setAccentColor(response.data[0]?.settingsusers_primarybutton);
      setFontColor(response.data[0]?.settingsusers_fontcolor);
      setDangerColor(response.data[0]?.settingsusers_cancelbutton);
      setBackgroundColor(response.data[0]?.settingsusers_backgroundcolor);
      setFontButtonColor(response.data[0]?.settingsusers_fontbuttoncolor);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      {" "}
      <Grid item container>
        <Grid xs={12} md={12} xl={12}>
          <Typography variant="h5">Setting</Typography>
        </Grid>
        <Grid xs={12} md={5} xl={5}>
          <Grid item container>
            {buttons.map((button, index) => (
              <Grid key={index} xs={12} md={6} xl={6}>
                <Item>
                  <Card>
                    <Button
                      aria-label="save"
                      fullWidth
                      variant="contained"
                      startIcon={button.icon}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2, // ระยะห่างระหว่าง icon และข้อความ
                        height: "150px",
                      }}
                      onClick={(e) => handleClick(button.show)}
                    >
                      {button.text}
                    </Button>
                  </Card>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid marginLeft={5} xs={12} md={6} xl={6}>
          {show == 1 && (
            <div>
              <Grid container item>
                <Grid xs={12} md={6} xl={6}>
                  <Item>
                    <Typography
                      variant="h1"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      ขนาด Font
                    </Typography>
                  </Item>
                </Grid>
                <Grid xs={12} md={6} xl={6}>
                  <Item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">ขนาด Font</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fontSize}
                        InputLabelProps={{ shrink: true }}
                        label="ขนาด Font"
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value={18}>18</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={22}>22</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={26}>26</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid xs={12} xl={12} md={12}>
                  <Grid item container>
                    <Grid xs={12} xl={6} md={6}>
                      <Item>
                        <Button
                          style={{
                            color: fontButtonColor,
                            backgroundColor: primaryColor,
                          }}
                          variant="contained"
                        >
                          Navbarcolor{" "}
                        </Button>

                        <ColorPicker
                          color={primaryColor}
                          onChange={(color) =>
                            handleColorChange(color, setPrimaryColor)
                          }
                        />
                      </Item>
                    </Grid>
                    <Grid xs={12} xl={6} md={6}>
                      {" "}
                      <Item>
                        <Button
                          variant="contained"
                          style={{
                            color: fontColor,
                            background: BackgroundColor,
                          }}
                        >
                          BackgroundColors
                        </Button>
                        <ColorPicker
                          color={fontButtonColor}
                          onChange={(color) =>
                            handleColorChange(color, setBackgroundColor)
                          }
                        />
                      </Item>
                    </Grid>
                    <Grid xs={12} xl={6} md={6}>
                      {" "}
                      <Item>
                        <Button
                          style={{
                            color: fontButtonColor,
                            backgroundColor: accentColor,
                          }}
                          variant="contained"
                        >
                          PrimaryButton{" "}
                        </Button>

                        <ColorPicker
                          color={accentColor}
                          onChange={(color) =>
                            handleColorChange(color, setAccentColor)
                          }
                        />
                      </Item>
                    </Grid>

                    <Grid xs={12} xl={6} spacing={2} md={6}>
                      {" "}
                      <Item>
                        <Button
                          style={{
                            color: fontButtonColor,
                            backgroundColor: dangerColor,
                          }}
                          variant="contained"
                        >
                          Cancel{" "}
                        </Button>

                        <ColorPicker
                          color={dangerColor}
                          onChange={(color) =>
                            handleColorChange(color, setDangerColor)
                          }
                        />
                      </Item>
                    </Grid>

                    <Grid xs={12} xl={6} md={6}>
                      {" "}
                      <Item>
                        <Button
                          variant="contained"
                          style={{
                            color: fontButtonColor,
                            background: accentColor,
                          }}
                        >
                          FontButtonColors
                        </Button>
                        <ColorPicker
                          color={fontButtonColor}
                          onChange={(color) =>
                            handleColorChange(color, setFontButtonColor)
                          }
                        />
                      </Item>
                    </Grid>

                    <Grid xs={12} xl={6} md={6}>
                      {" "}
                      <Item>
                        <h3 style={{ color: fontColor }}>
                          FontBackgroundColors
                        </h3>
                        <ColorPicker
                          color={fontColor}
                          onChange={(color) =>
                            handleColorChange(color, setFontColor)
                          }
                        />
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} md={12} xl={12}>
                  <Item>
                    {" "}
                    <Button
                      onClick={(e) => postdata(e)}
                      color="primary"
                      fullWidth
                      variant="contained"
                    >
                      {" "}
                      อัพเดทข้อมูล
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </div>
          )}

          {show == 2 && (
            <div>
              <Employee />
            </div>
          )}
          {show == 3 && (
            <div>
              <Typesetting />
            </div>
          )}

          {show == 5 && (
            <div>
              <Gettoken />
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Setting;
