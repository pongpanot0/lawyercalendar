const fs = require("fs");

// Specify the path to your JSON file

exports.getTambon = async (req, res) => {
  const filePath = "./raw_database.json";
  // Read the JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return;
    }

    try {
      // Parse the JSON data into a JavaScript object
      const jsonData = JSON.parse(data);
      const groupedData = {};

      jsonData.forEach((item) => {
        const { zipcode } = item;
        if (!groupedData[zipcode]) {
          groupedData[zipcode] = [];
        }
        groupedData[zipcode].push({
          district: item.district,
          amphoe: item.amphoe,
          province: item.province,
          zipcode: item.zipcode,
          district_code: item.district_code,
          amphoe_code: item.amphoe_code,
          province_code: item.province_code,
        });
      });

      // แปลงข้อมูลเป็นรูปแบบที่ต้องการ
      const formattedData = [];

      for (const province in groupedData) {
        formattedData.push({
          province: province,
          data: groupedData[province],
        });
      }
      // Access and use the data
      res.send({
        status: 200,
        data: formattedData,
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
};
exports.getAmphure = async (req, res) => {
  // Read the JSON file
  const filePath = "./raw_database.json";
  const amphure_id = req.body.data;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return;
    }

    try {
      // Parse the JSON data into a JavaScript object
      const jsonData = JSON.parse(data);

      const fil = jsonData.filter((map)=>map.zipcode == amphure_id)

      const groupedData = {};
 
      fil.forEach((item) => {
        const { amphoe } = item;
        if (!groupedData[amphoe]) {
          groupedData[amphoe] = [];
        }
        groupedData[amphoe].push({
          district: item.district,
          amphoe: item.amphoe,
          province: item.province,
          zipcode: item.zipcode,
          district_code: item.district_code,
          amphoe_code: item.amphoe_code,
          province_code: item.province_code,
        });
      });

      // แปลงข้อมูลเป็นรูปแบบที่ต้องการ
      const formattedData = [];

      for (const province in groupedData) {
        formattedData.push({
          province: province,
          data: groupedData[province],
        });
      }
    
    
      // Access and use the data
      res.send({
        status: 200,
        data: formattedData,
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
};
exports.getdistrict = async (req, res) => {
  // Read the JSON file
  const filePath = "./raw_database.json";
  const district_id = req.body.data;
  
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return;
    }

    try {
      // Parse the JSON data into a JavaScript object
      const jsonData = JSON.parse(data);
     
      const filter = jsonData.filter((map) => map.amphoe == district_id);
 
      // Access and use the data
      res.send({
        status: 200,
        data: filter,
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
};
exports.getProvince = async (req, res) => {
  // Read the JSON file
  const filePath = "./raw_database.json";
  const province_id = req.body.data;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return;
    }

    try {
      // Parse the JSON data into a JavaScript object
      const jsonData = JSON.parse(data);
     
      const filter = jsonData.filter((map) => map.district == province_id);

      // Access and use the data
      res.send({
        status: 200,
        data: filter,
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
};