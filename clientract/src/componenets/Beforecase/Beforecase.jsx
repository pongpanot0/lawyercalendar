import { Button, Container, Grid, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import apiService from "../Shared/Apiserver";
import dayjs from "dayjs";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const Beforecase = () => {
  const columns = [
    { field: "tsb_ref", headerName: "TSB Ref.", width: 200 },
    { field: "beforecase_name", headerName: "ประเภทการรับเอกสาร", width: 200 },
    {
      field: "ClientName",
      headerName: "ลูกค้า",

      width: 200,
    },
    {
      field: "Employees",
      headerName: "ผู้รับเอกสาร",

      width: 200,
      valueGetter: (params) =>
        `${params.row.employee_firstname || ""} ${
          params.row.employee_lastname || ""
        }`,
    },
    {
      field: "claimamount",
      headerName: "Claim Amount",

      width: 200,
    },
    {
      field: "assured",
      headerName: "ผู้เอาประกัน",

      width: 200,
    },
    {
      field: "DateReceived",
      headerName: "วันที่รับเอกสาร",
      width: 200,
      valueGetter: (params) =>
        `${dayjs(params.row.DateReceived).format("DD/MM/YYYY")}`,
    },
    {
      field: "timebar",
      headerName: "Timebar",
      width: 200,
      valueGetter: (params) =>
        `${dayjs(params.row.timebar).format("DD/MM/YYYY")}`,
    },
    {
      field: "ACtion",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <NavLink
            to={`/beforecase-setting/${params.row.DocumentID}`}
            direction="row"
            spacing={2}
          >
            <Button variant="outlined" color="warning" size="small">
              Edit
            </Button>
          </NavLink>
        );
      },
    },
  ];
  React.useEffect(() => {
    getData();
  }, []);
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await apiService.getbeforecasedocuments();
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid item container spacing={2}>
        <Grid xs={12} md={12} xl={12}>
          <Link to={"/beforecase-create"}>
            <Button variant="contained">เพิ่มข้อมูล</Button>
          </Link>
        </Grid>
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.DocumentID}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Beforecase;
