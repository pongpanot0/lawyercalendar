import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import apiService from "../../../Shared/Apiserver";
const Tasklist = ({ todolistData, case_ids,onCheckboxChange,case_timeline_id }) => {
  const postData = async () => {
    try {
 
      const data = {
        case_timeline_id: case_timeline_id,
        case_id: case_ids,
        case_todolist_name: case_todolist_name,
      };
      const response = await apiService.Createtask(data);
      console.log(response);
      onCheckboxChange(case_timeline_id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCheckboxChange = async (case_todolist, isChecked) => {
    try {
      const data = {
        case_todolist: case_todolist,
        case_todolist_sucess: isChecked ? 0 : 1,
      };

      const response = await apiService.updateTask(data);

      onCheckboxChange(todolistData[0]?.case_timeline_id);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const [case_todolist_name, setcase_todolist_name] = React.useState("");
  return (
    <div>
      <Stack direction={"row"}>
        <TextField
          onChange={(e) => setcase_todolist_name(e.target.value)}
          label="เพิ่ม TODO"
        />
        <Button
          startIcon={<AddBoxIcon style={{ fontSize: 34 }} />}
          variant="contained"
          color="primary"
          onClick={postData}
        >
          Add data
        </Button>
      </Stack>
      {todolistData.map((res) => {
        const isChecked = res.case_todolist_sucess == 1;

        return (
          <Stack
            direction="row"
            spacing={3}
            mt={2}
            justifyContent="space-between"
          >
            <FormGroup>
              <FormControlLabel
                onChange={(e) =>
                  handleCheckboxChange(res.case_todolist, isChecked)
                }
                control={<Checkbox checked={isChecked} />}
                label={<Typography>{res.case_todolist_name}</Typography>}
              />
            </FormGroup>
            <DeleteIcon />
          </Stack>
        );
      })}
    </div>
  );
};

export default Tasklist;
