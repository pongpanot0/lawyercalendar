import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import apiService from "../../Shared/Apiserver";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const Notice = () => {
  const columns = [
    { field: "CaseNotice_ref", headerName: "CaseNotice_ref", width: 200 },
    { field: "Customer_ref", headerName: "Caseref", width: 200 },
    {
      field: "CaseNotice_amount",
      headerName: "expenses",
      type: "number",
      width: 200,
    },
    {
      field: "CaseNotice_to",
      headerName: "CaseNotice_to",

      width: 200,
    },

    {
      field: "CaseNotice_senddate",
      headerName: "CaseNotice_senddate",
      width: 200,
    },
    {
      field: "employee_firstname",
      headerName: "Full name",

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
