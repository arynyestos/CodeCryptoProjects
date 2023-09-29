const mssql = require('mssql')

const conexionesSQLServer = {
    // user: 'sa',
    // password:'my-secret-pw',
    // database: 'northwind',
    // server: 'localhost',
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: process.env.SQLSERVER_DATABASE,
    server: process.env.SQLSERVER_HOST,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function consulta(sql, params) {
    try{
        await mssql.connect(conexionesSQLServer)
        const resultados = await mssql.query(sql)
        return resultados
    } catch (error) {
        return {err: JSON.stringify(error)}
    }
}

module.exports = {
    consulta
}