const mysql = require("mysql");
const async = require("async");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aru123@@",
  database: "mydb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

function fetch(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
	  if (err) reject(err);
      resolve(result);
    });
  }).then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

// function insertion(sql) {
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Inserted!");
//     console.log(result.affectedRows);
//   });
// }
module.exports = { fetch };
