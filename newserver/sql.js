const mysql = require("mysql");

const config = {
  host: process.env.DB_HOST || "10.222.98.153",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "lawyer_production",
};

const pool = mysql.createPool(config);

const api = async (query, rowsAffected, type, table) => {
  try {
    let connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        resolve(connection);
      });
    });

    if (type == "bulk") {
      // Your logic for bulk insert here

      connection.release();
      return true;
    } else {
      let data = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });

      connection.release();

      if (rowsAffected == true) {
        return data.affectedRows;
      } else {
        return data;
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = api;
