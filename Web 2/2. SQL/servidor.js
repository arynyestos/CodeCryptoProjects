const ex = require('express')
require('dotenv').config()
const mysql = require("./BBDD/mysql")
const pg = require("./BBDD/pg")
const sqlserver = require("./BBDD/sqlserver")

const servidor = ex()

servidor.get("/ping", (req, res) => {
    res.send({fecha: new Date().toISOString()})
})

servidor.get("/customersMysql", async (req, res) => {
    mysql.consulta("select * from Customers").then((resultados) => {
        res.send(resultados)
    }).catch(e => {
        res.send(e)
    })
})

servidor.get("/customersPostgresql", async (req, res) => {
    pg.consulta("select * from Customers").then((resultados) => {
        res.send(resultados)
    }).catch(e => {
        res.send(e)
    })
})

servidor.get("/customersPostgresql2", async (req, res) => {
    try{
        const resultados = await pg.consulta("select * from Customers")
        res.send(resultados)
    }catch(error) {
        res.send(error)
    }
})

servidor.get("/customersSqlserver", async (req, res) => {
    try{
        const resultados = await sqlserver.consulta("select * from Customers")
        res.send(resultados)
    }catch(error) {
        res.send(error)
    }
})

servidor.listen(5555, () => {

})

