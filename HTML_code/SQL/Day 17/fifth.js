var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "itcompany"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT* from customers where address='Highway 37'", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});