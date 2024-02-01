import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import apiService from "../../Shared/Apiserver";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const CaseEmployee = ({ onDataSubmit, onCloseDialog }) => {
  const [inputFields, setInputFields] = useState([{ value: "", age: "" }]);
  const [formControls, setFormControls] = useState([0]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ value: "", age: "" });
    setInputFields(values);

    const controls = [...formControls];
    controls.push(controls.length);
    setFormControls(controls);
  };
  const [onValue, setonValue] = React.useState([]);
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
    onDataSubmit(values);
    // Update parent component with the changed data
  };

  const handleChange = (index, event) => {
    const values = [...inputFields];
    values[index].age = event.target.value;
    setInputFields(values);
    onDataSubmit(values);
    // Update parent component with the changed data
  };
  const [employeesData, setEmployeesData] = React.useState([]);
  const [employeescasetype, setEmployeescasetypeData] = React.useState([]);
  React.useEffect(() => {
    getEmployeesData();
    getemploycasetypeData();
  }, []);
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
  const handleSubmit = () => {
    // You can perform any validation or processing here before sending data to the parent
    onDataSubmit(inputFields);
  };
  const handleDelete = (indexToDelete) => {
    setInputFields((prevInputFields) =>
      prevInputFields.filter((inputField, index) => index !== indexToDelete)
    );
  };
  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: 5 }}
        onClick={handleAddFields}
      >
        เพิ่มผู้รับผิดชอบ
      </Button>

      {inputFields.map((inputField, index) => (
        <Grid container item spacing={2} mt={2} key={index}>
          <Grid item xs={12} sm={12} xl={12}>
            <Item>
            <Divider textAlign="right" ><Chip label="ยกเลิกแถว" onClick={e=>handleDelete(index)} /></Divider>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} xl={6}>
            <Item>
              <FormControl fullWidth>
                <InputLabel id={`demo-simple-select-label-${index}`}>
                  เลือกผู้รับผิดชอบ
                </InputLabel>
                <Select
                  labelId={`demo-simple-select-label-${index}`}
                  id={`demo-simple-select-${index}`}
                  value={inputField.value}
                  label="เลือกผู้รับผิดชอบ"
                  onChange={(event) => handleChangeInput(index, event)}
                >
                  {employeesData.map((res) => {
                    return (
                      <MenuItem value={res.employee_id}>
                        {res.employee_firstname} {""} {res.employee_lastname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          {formControls.includes(index) && (
            <Grid item xs={12} sm={12} xl={6}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id={`demo-simple-select-label-${index}`}>
                    เลือกประเภท
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-label-${index}`}
                    id={`demo-simple-select-${index}`}
                    value={inputField.age}
                    label="เลิอกประเภท"
                    onChange={(event) => handleChange(index, event)}
                  >
                    {employeescasetype.map((res) => {
                      return (
                        <MenuItem value={res.employeescasetype_id}>
                          {res.employeescasetype_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          )}
        </Grid>
      ))}
    </div>
  );
};

export default CaseEmployee;
