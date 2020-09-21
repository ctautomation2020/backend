var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "127.0.0.1",
  port:"3307",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con