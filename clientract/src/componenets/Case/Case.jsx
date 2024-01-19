import { Button, Container, Grid, IconButton } from "@mui/material";
import React from "react";
import { DataGrid,GridToolbar  } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Createcase from "./create-case/Createcase";
import { Link, NavLink } from "react-router-dom";
import apiService from "../Shared/Apiserver";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarView from "./calendar/CalendarView";
const ButtonCell = (params) => {
  const handleClick = () => {
    // Handle button click logic here, e.g., navigate to a new page
    console.log("Button clicked for row ID:", params.id);
  };

  return (
    <div>
      <Link to={`/casedetail/${params.id}`}>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          {params.value}
        </Button>
      </Link>
    </div>
  );
};
const columns = [
  {
    field: "tsb_ref",
    headerName: "TSB Ref.",
    width: 220,
    editable: true,
  },
  {
    field: "Customer_ref",
    headerName: "Claim No.",
    width: 220,
    editable: true,
  },
  {
    field: "plaintiff_type",
    headerName: "ประเภท",
    width: 220,
    editable: true,
    valueGetter: (params) => {
      console.log(params);
      if (params.row.plaintiff_type == 1) {
        return `เป็นโจทก์`;
      }
      if (params.row.plaintiff_type == 2) {
        return `เป็นจำเลย`;
      }
    },
  },

  {
    field: "ClientName",
    headerName: "ลูกค้า",

    width: 220,
    editable: true,
  },
  {
    field: "CaseTypeName",
    headerName: "ประเภทคดี",
    sortable: false,
    width: 220,
  },
  {
    field: "Actions",
    headerName: "Actions",
    sortable: false,
    width: 220,
    renderCell: (params) => {
      return (
        <NavLink to={`/casedetail/${params.row.CaseID}`}>
          <Button variant="contained" fullWidth color="primary">
            Detail{" "}
          </Button>
        </NavLink>
      );
    },
  },
];

const Case = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    getData();
  }, []);
  const [data, setdata] = React.useState([]);
  const getData = async () => {
    try {
      const response = await apiService.getCase();

      setdata(response.data);
    } catch (error) {}
  };
  const [Showvalues, setShowvalues] = React.useState(1);
  return (
    <Container maxWidth="xl">
      <Grid container item>
        <Grid xs={10} md={10} xl={10}></Grid>
        <Grid xs={2} md={2} xl={2}>
          <Button
            onClick={(e) => setShowvalues(1)}
            aria-label="delete"
            variant="contained"
            style={{ marginRight: 5 }}
          >
            <TableChartIcon size="large" />
          </Button>

          <Button
            onClick={(e) => setShowvalues(2)}
            aria-label="delete"
            variant="contained"
          >
            <CalendarMonthIcon size="large" />
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: 10 }}>
        {Showvalues == 1 && (
          <Grid container item spacing={2}>
            <Grid xs={12} xl={12} alignItems={"end"} alignContent={"end"}>
              {/*  <Link to={"/case-create"}>
                {" "}
                <Button variant="contained">Open modal </Button>
              </Link> */}
            </Grid>
            <Grid xs={12} sm={12} xl={12} mt={3}>
              <DataGrid
                rows={data}
                columns={columns}
            
                getRowId={(row) => row.CaseID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                columnThreshold={2}
                disableRowSelectionOnClick
              />
            </Grid>
          </Grid>
        )}{" "}
        {Showvalues == 2 && (
          <div>
            <CalendarView data={data} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Case;
