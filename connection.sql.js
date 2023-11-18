const mysql = require('mysql');
require("dotenv").config({ path: "./.env" });

const host = process.env.MYSQL_HOST_NAME;
const port = process.env.MYSQL_PORT; // Define the port from your environment variables
const username = process.env.MYSQL_USER_NAME;
const password = process.env.MYSQL_PASSWORD;
const dbname = process.env.MYSQL_DB_NAME;

let con;

function connectToMySQL() {
  con = mysql.createConnection({
    host: host,
    port: port, // Specify the port here
    user: username,
    password: password,
    database: dbname,
  });

  con.connect((err) => {
    if (!err) {
      console.log('MySql Connected');
    } else {
      console.log(err);
      // Retry the connection after 20 seconds
      setTimeout(connectToMySQL, 20000);
    }
  });

  con.on('error', (err) => {
    console.log('MySql Error:', err);
    console.log('Retrying connecting to MySql in 20 seconds');
    // if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection lost, retry the connection after 20 seconds
      setTimeout(connectToMySQL, 20000);
    // }
  });
}

// Initial connection attempt
connectToMySQL();

module.exports = con;
