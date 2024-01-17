import React, { useState } from "react";
import {
  Button,
  TextField,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const CustomerReponsible = ({ onDataSubmit }) => {
  const [inputFields, setInputFields] = useState([
    { firstname: "", lastname: "", email: "", phone: "" },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { firstname: "", lastname: "", email: "", phone: "" },
    ]);
  };

  const handleChangeInput = (index, fieldName, event) => {
    const values = [...inputFields];
    values[index][fieldName] = event.target.value;
    setInputFields(values);
    onDataSubmit(values);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: 5 }}
        onClick={handleAddFields}
      >
        Add New Row
      </Button>

      {inputFields.map((inputField, index) => (
        <Grid container item spacing={2} mt={2} key={index}>
          <Grid xs={12} md={12} xl={12}>
            <Divider textAlign="right" ><Chip label="ยกเลิกแถว" onClick={handleRemoveFields} /></Divider>
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Item>
              <TextField
                labelId={`firstname-label-${index}`}
                id={`firstname-${index}`}
                value={inputField.firstname}
                onChange={(event) =>
                  handleChangeInput(index, "firstname", event)
                }
                fullWidth
                label="FirstName"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Item>
              <TextField
                labelId={`lastname-label-${index}`}
                id={`lastname-${index}`}
                value={inputField.lastname}
                onChange={(event) =>
                  handleChangeInput(index, "lastname", event)
                }
                fullWidth
                label="Lastname"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Item>
              <TextField
                labelId={`email-label-${index}`}
                id={`email-${index}`}
                value={inputField.email}
                onChange={(event) => handleChangeInput(index, "email", event)}
                fullWidth
                label="Email"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Item>
              <TextField
                labelId={`phone-label-${index}`}
                id={`phone-${index}`}
                value={inputField.phone}
                onChange={(event) => handleChangeInput(index, "phone", event)}
                fullWidth
                label="Phone"
              />
            </Item>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};
export default CustomerReponsible;
