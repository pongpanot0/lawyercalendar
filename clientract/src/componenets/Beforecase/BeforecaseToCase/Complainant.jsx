import React, { useState } from "react";

import { Button, TextField, Divider, Grid, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
const Item = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));
const Complainant = ({ Complainantsubmit }) => {
    const [inputFields, setInputFields] = useState([
      { firstname: "", lastname: "" },
    ]);
  
    const handleAddFields = () => {
      setInputFields([...inputFields, { firstname: "", lastname: "" }]);
    };
  
    const handleChangeInput = (index, fieldName, event) => {
      const values = [...inputFields];
      values[index][fieldName] = event.target.value;
      setInputFields(values);
      Complainantsubmit(values);
    };
    const handleRemoveFields = (index) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };
   
    return (
      <div style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          style={{ marginTop: 5 }}
          onClick={handleAddFields}
        >
          เพิ่มผู้ร้อง
        </Button>
  
        {inputFields.map((inputField, index) => (
          <Grid container item spacing={2} mt={2} key={index}>
            <Grid xs={12} md={12} xl={12}>
              <Divider textAlign="right">
                <Chip label="ยกเลิกแถว" onClick={handleRemoveFields} />
              </Divider>
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Item>
                <TextField
                  labelId={`firstname-label-${index}`}
                  id={`firstname-${index}`}
                  value={inputField.firstname}
                  onChange={(event) =>
                    handleChangeInput(index, "firstname", event)
                  }
                  fullWidth
                  label={`ผู้ร้องที่ ${index + 1}`}
                />
              </Item>
            </Grid>
        
          </Grid>
        ))}
      </div>
    );
  };
  

export default Complainant