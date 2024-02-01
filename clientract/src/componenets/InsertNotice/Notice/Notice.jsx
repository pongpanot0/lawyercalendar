import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import apiService from "../../Shared/Apiserver";
import dayjs from "dayjs";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const Notice = () => {
  const columns = [
    { field: "CaseNotice_ref", headerName: "TSB Ref.", width: 200 },
    {
      field: "CaseNotice_amount",
      headerName: "ค่าใช้จ่าย",
      type: "number",
      width: 200,
    },
    {
      field: "CaseNotice_to",
      headerName: "ส่งถึง",
      width: 200,
      valueGetter: (params) => {
        if (params.row.CaseNotice_to !== "undefined") {
          return params.row.CaseNotice_to;
        } else {
          return "ยังไม่ได้เพิ่มผู้ส่ง";
        }
      },
    },

    {
      field: "CaseNotice_senddate",
      headerName: "วันที่ส่ง",
      width: 200,
      valueGetter: (params) =>
        `${dayjs(params.row.CaseNotice_senddate).format("DD/MM/YYYY") || ""}`,
    },
    {
      field: "employee_firstname",
      headerName: "ผู้ส่ง",

      sortable: false,
      width: 300,
      valueGetter: (params) =>
        `${params.row.employee_firstname || ""} ${
          params.row.employee_lastname || ""
        }`,
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await apiService.getNotice();
      setData(response.data);
      console.log(response.data);
    } catch (error) {}
  };
  return (
    <Container maxWidth="xl">
      <Grid container item spacing={2}>
        {/*  <Grid xs={12} md={12} xl={12}>
          <Link to={"/insert-notice"}>
            <Button variant="contained" color="primary">
              {" "}
              Add data
            </Button>
          </Link>
        </Grid> */}
        <Grid xs={12} md={12} xl={12}>
          <Item>
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.CaseNotice_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Notice;
