const mysql = require("mysql2");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "/Puja#29",
    database: "noteappdb"
});
module.exports = db.promise();