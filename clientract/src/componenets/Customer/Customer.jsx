import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import apiService from "../Shared/Apiserver";
import CustomerCard from "./Card/CustomerCard";
const columns = [
  { field: "ClientName", headerName: "ชื่อลูกค้า", width: 200 },
  {
    field: "customertypes_name",
    headerName: "ประเภทลูกค้า",
    width: 200,
  },
  {
    field: "TotalValue",
    headerName: "จำนวน Case ทั้งหมด",
    width: 200,
    type: "number",
  },
  {
    field: "crtotalValue",
    headerName: "จำนวน ผู้รับผิดชอบ ทั้งหมด",
    width: 300,
    type: "number",
  },
  
];

function Customer() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [customer, setcustomer] = React.useState([]);
  React.useEffect(() => {
    getcustomerData();
  }, []);
  const getcustomerData = async () => {
    try {
      const response = await apiService.getcustomer();
      setcustomer(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [showValues, setshowValues] = React.useState(1);
  return (
    <Container maxWidth="xl">
      <Grid container item>
        <Grid xs={10} md={10} xl={10}></Grid>
        <Grid xs={2} md={2} xl={2}>
          <Button
            onClick={(e) => setshowValues(1)}
            aria-label="delete"
            variant="contained"
            style={{ marginRight: 5 }}
          >
            <TableChartIcon size="large" />
          </Button>

          <Button
            onClick={(e) => setshowValues(2)}
            aria-label="delete"
            variant="contained"
          >
            <RecentActorsIcon size="large" />
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: 10 }}>
        {showValues == 1 && (
          <Grid container spacing={2}>
            <Grid xs={12} xl={12} alignItems={"end"} alignContent={"end"}>
              <Link to={"/customer-create"}>
                {" "}
                <Button variant="contained">เพิ่มข้อมูล</Button>
              </Link>
            </Grid>
            <Grid xs={12} sm={12} xl={12} mt={3}>
              <DataGrid
                rows={customer}
                columns={columns}
                getRowId={(row) => row.ClientID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Grid>
          </Grid>
        )}
        {showValues == 2 && (
          <div>
            <CustomerCard customer={customer} />{" "}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Customer;
