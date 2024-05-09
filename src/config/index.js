const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "finger_print_data",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { connection };
