const mysql = require("mysql8")

var conexiones = mysql.createPool({
    connectionLimit: 10,
    // host: 'localhost',
    // user: 'root',
    // password: 'my-secret-pw',
    // database: 'northwind'
    host: process.env.MSQL_HOST,
    user: process.env.MSQL_USER,
    password: process.env.MSQL_PASSWORD,
    database: process.env.MSQL_DATABASE
});

function consulta(sql, parameters) {
    return new Promise((resolve, reject) => {
        conexiones.query(sql, parameters, function (error, results, fields) {
            if (error) reject(error);
                return resolve([results, fields]);
        });
    });
}

module.exports = {
    consulta
}