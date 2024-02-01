import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import apiService from "../../Shared/Apiserver";
import CustomerReponsible from "./CustomerReponsible";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
function CreateCustomer() {
  const [age, setAge] = React.useState("");
  const [customer_name, setcustomer_name] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  React.useEffect(() => {
    getCustomertypeData();
  }, []);
  const [customerType, setcustomerType] = React.useState([]);
  const getCustomertypeData = async () => {
    try {
      const response = await apiService.getCustomerType();
      setcustomerType(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [homeNum, setHomenum] = React.useState("");
  const [tax, settax] = React.useState("");
  const postdata = async () => {
    try {
      const data = {
        ClientName: customer_name,
        ClientType: age,
        ClientHomenum: homeNum,
        ClientProvince: selected.province_id,
        Clientamphure: selected.amphure_id,
        Clienttambon: selected.tambon_id,
        Clientzipcode: selected.zip_code,
        ClientTax: tax,
        customerRes:handleCusres
      };
      const response = await apiService.createcustomer(data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const DropdownList = ({
    label,
    id,
    list,
    child,
    childsId = [],
    setChilds = [],
    val,
    zipCodeSetter,
  }) => {
    const onChangeHandle = (event) => {
      setChilds.forEach((setChild) => setChild([]));
      const entries = childsId.map((child) => [child, undefined]);
      const unSelectChilds = Object.fromEntries(entries);

      const input = event.target.value;
      const dependId = input ? Number(input) : undefined;

      setSelected((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId }));

      if (!input) {
        // Clear the zip code when no sub-district is selected
        zipCodeSetter("");
        return;
      }

      if (child) {
        const parent = list.find((item) => item.id === dependId);
        console.log(parent);
        const { [child]: childs, zip_code } = parent;

        // Set the zip code when a sub-district is selected
        zipCodeSetter(zip_code);
    
        selected.zip_code = zip_code;
        const [setChild] = setChilds;
        setChild(childs);
      }
    };

    return (
      <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={val}
            label={label}
            onChange={onChangeHandle}
          >
            {list.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name_th} - {item.name_en}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </>
    );
  };
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [zip_code, setzip_code] = useState([]);

  const [selected, setSelected] = useState({
    province_id: undefined,
    amphure_id: undefined,
    tambon_id: undefined,
    zip_code: undefined,
  });

  useEffect(() => {
    (() => {
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      )
        .then((response) => response.json())
        .then((result) => {
          setProvinces(result);
        });
    })();
  }, []);
  const [handleCusres,setHandlecusres]=React.useState([])
  const handleDataFromCaseEmployee = (data) => {
    // Handle the data received from CaseEmployee
    console.log("Data from CaseEmployee:", data);
    setHandlecusres(data)

  };
  return (
    <Grid item container mt={3}>
    
      <Grid xs={12} xl={8} md={8}></Grid>{" "}
      <Grid xs={12} mt={3} xl={4} md={4}>
        <Item>
          <Button
            onClick={(e) => postdata(e)}
            style={{ width: "100%" }}
            variant="contained"
          >
            เพิ่มข้อมูล
          </Button>
        </Item>
      </Grid>{" "}
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <TextField
            onChange={(e) => setcustomer_name(e.target.value)}
            style={{ width: "100%" }}
            id="standard-basic"
            label="ชื่อลูกค้า"
            variant="outlined"
          />
        </Item>
      </Grid>{" "}
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">ประเภทลูกค้า</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="ประเภทลูกค้า"
              onChange={handleChange}
            >
              {customerType.map((res) => {
                return (
                  <MenuItem value={res.customertypes_id}>
                    {res.customertypes_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <TextField
            onChange={(e) => settax(e.target.value)}
            style={{ width: "100%" }}
            id="standard-basic"
            label="เลขประจำตัวผู้เสียภาษี"
            variant="outlined"
          />
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <TextField
            onChange={(e) => setHomenum(e.target.value)}
            style={{ width: "100%" }}
            id="standard-basic"
            label="บ้านเลขที่"
            variant="outlined"
          />
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <DropdownList
            label="จังหวัด"
            id="province_id"
            list={provinces}
            val={selected.province_id}
            child="amphure"
            childsId={["amphure_id", "tambon_id"]}
            setChilds={[setAmphures, setTambons]}
            zipCodeSetter={setzip_code}
          />
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <DropdownList
            label="อำเภอ / เขต"
            id="amphure_id"
            list={amphures}
            val={selected.amphure_id}
            child="tambon"
            childsId={["tambon_id"]}
            setChilds={[setTambons]}
            zipCodeSetter={setzip_code}
          />
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <DropdownList
            label="ตำบล / แขวง"
            val={selected.tambon_id}
            id="tambon_id"
            setChilds={[setzip_code]}
            list={tambons}
            child="zip_code"
            zipCodeSetter={setzip_code} // Pass the setzip_code function
          />
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={6} md={6}>
        <Item>
          <TextField
            fullWidth
            id="zip_code"
            label="รหัสไปรษณีย์"
            value={zip_code}
          />
        </Item>
      </Grid>
      <Grid xs={12} mt={3} xl={12} md={12}>
        <CustomerReponsible onDataSubmit={handleDataFromCaseEmployee} />
      </Grid>
    </Grid>
  );
}

export default CreateCustomer;
