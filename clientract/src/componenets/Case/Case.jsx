import { Button, Container, Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Createcase from "./create-case/Createcase";
import { Link, NavLink } from "react-router-dom";
import apiService from "../Shared/Apiserver";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarView from "./calendar/CalendarView";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExcelService from "../Shared/Excelservice";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

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

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [customerdata, setCustomerData] = React.useState([]);

  const getCustomerdata = async () => {
    try {
      const response = await apiService.getcustomer();
      setCustomerData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [casetypeData, setCasetypeData] = React.useState([
    {
      CaseTypeID: 1,
      CaseTypeName: "",
    },
  ]);
  const [casetype, setcasetype] = React.useState("");
  const handleChange3 = (event) => {
    setcasetype(event.target.value);
  };
  React.useEffect(() => {
    getData();
    getCasetypedata();
    getCustomerdata();
  }, []);
  const [data, setdata] = React.useState([]);
  const handleSelectionModelChange = (selectionModel) => {
    // Log the selected rows to the console
    console.log("Selected Rows:", selectionModel);
    // Update the state to keep track of the selected rows if needed
    setSelectedRows(selectionModel);
  };
  const exportExcel = async () => {
    try {
      const response = await apiService.exportExcelCase(selectedRows);
      console.log(response);
      ExcelService.downloadFromBase64(response, "CaseExport.xlsx");
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async () => {
    try {
      const response = await apiService.getCase();

      setdata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [cusdata, setcusdata] = React.useState("");
  const handleChange5 = (event) => {
    setcusdata(event.target.value);
  };
  
  
  const filteredData = data.filter((item) => {
    // Check if searchTerm matches tsb_ref and casetype matches CaseTypeName
    const searchTermMatch = item.tsb_ref
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Check if cusdata is "ทั้งหมด" or matches ClientName
    const cusdataMatch =
      cusdata === "ทั้งหมด" || item.ClientName.includes(cusdata);
    const caseMatch =
      casetype === "ทั้งหมด" || item.CaseTypeName.includes(casetype);
      
    // Return true if all conditions are met
    return searchTermMatch && cusdataMatch && caseMatch;
  });
  const getCasetypedata = async () => {
    try {
      const response = await apiService.GetCaseType();
      setCasetypeData(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
          <Grid container item spacing={2} mt={2}>
            <Grid xs={10} md={3} xl={3}>
              <Item>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Search by TSB Ref."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Item>
            </Grid>
            <Grid xs={10} md={2} xl={2}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ลูกค้า</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    value={cusdata}
                    label="Age"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange5}
                    required={true}
                  >
                    {" "}
                    <MenuItem value={"ทั้งหมด"}>ทั้งหมด</MenuItem>
                    {customerdata.map((res) => {
                      return (
                        <MenuItem value={res.ClientName}>
                          {res.ClientName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid xs={10} md={2} xl={2}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ประเภทคดี
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={casetype}
                    label="Age"
                    onChange={handleChange3}
                    required={true}
                  >
                    <MenuItem value={"ทั้งหมด"}>ทั้งหมด</MenuItem>
                    {casetypeData.map((res) => {
                      return (
                        <MenuItem id={res.CaseTypeID} value={res.CaseTypeName}>
                          {res.CaseTypeName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid xs={12} md={2} xl={2}>
            
            </Grid>
            <Grid xs={12} md={3} xl={3}>
              <Item>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!selectedRows.length > 0}
                  onClick={exportExcel}
                >
                  Export Excel
                </Button>
              </Item>
            </Grid>

            <Grid xs={12} sm={12} xl={12} mt={3}>
              <DataGrid
                rows={filteredData}
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
                onRowSelectionModelChange={handleSelectionModelChange}
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
