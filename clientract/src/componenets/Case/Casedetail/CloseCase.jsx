import { Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import apiService from "../../Shared/Apiserver";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const CloseCase = ({ caseid, loaddata }) => {
  const [closecasedetail, setclosecasedetail] = React.useState("");
  const postData = async () => {
    try {
      const data = {
        case_close_detail: closecasedetail,
        tsb_ref: caseid,
      };
      const response = await apiService.createCloseDetail(data);
     
      if (response.status == 200) {
        loaddata();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Container maxWidth="xl">
        <Grid item container>
          <Grid xs={12} md={12} xl={12}>
            <Item>
              <TextField
                label="หมายเหตุ/ความคิดเห็นทนาย"
                fullWidth
                minRows={6}
                onChange={(e) => setclosecasedetail(e.target.value)}
                multiline
              />
            </Item>
          </Grid>
          <Grid xs={12} md={12} mt={1} xl={12}>
            <Item>
              <Button
                onClick={(e) => postData()}
                color="primary"
                variant="contained"
                fullWidth
              >
                ยืนยันข้อมูล{" "}
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CloseCase;
