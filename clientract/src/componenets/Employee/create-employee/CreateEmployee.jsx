import { styled } from "@mui/material/styles";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import apiService from "../../Shared/Apiserver";

const Item = styled("div")(({ theme }) => ({

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
 
}));
function CreateEmployee() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [employee_firstname, setemployee_firstname] = React.useState("");
  const [employee_lastname, setemployee_lastname] = React.useState("");
  const [employee_role, setemployee_role] = React.useState([]);
  const [employee_phone, setemployee_phone] = React.useState("");
  const [employee_email, setemployee_email] = React.useState("");
  const [employee_cardno, setemployee_cardno] = React.useState("");

  const postData = async () => {
    try {
      const data = {
        employee_firstname: employee_firstname,
        employee_lastname: employee_lastname,
        employee_role: age,
        employee_phone: employee_phone,
        employee_email: employee_email,
        employee_cardno: employee_cardno,
      };
      const response = await apiService.createEmployee(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getRoledata();
  }, []);
  const getRoledata = async () => {
    try {
      const response = await apiService.getRole();
      setemployee_role(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Grid container item>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              fullWidth
              id="outlined-basic"
              label="FirstName"
              variant="outlined"
              onChange={(e) => setemployee_firstname(e.target.value)}
            />
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              fullWidth
              id="outlined-basic"
              label="SurName"
              variant="outlined"
              onChange={(e) => setemployee_lastname(e.target.value)}
            />
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              fullWidth
              id="outlined-basic"
              label="CardNo"
              variant="outlined"
              onChange={(e) => setemployee_cardno(e.target.value)}
            />
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              onChange={(e) => setemployee_phone(e.target.value)}
            />
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              onChange={(e) => setemployee_email(e.target.value)}
              variant="outlined"
            />
          </Item>
        </Grid>
        <Grid xs={12} md={6} xl={6}>
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                {employee_role.map((res) => {
                  return (
                    <MenuItem value={res.role_id}>{res.role_name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <Button onClick={(e) => postData(e)} fullWidth variant="contained">
              Add data
            </Button>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateEmployee;
