const { Pool } = require('pg')

const conexionesPg = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'postgres',
    // password:'my-secret-pw',
    // port: 5437
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

async function consulta(sql, params) {
    return new Promise(async (resolve, reject) => {
        conexionesPg.connect((err, client, done) => {
            if (err) reject(err) // Se puede rechazar porque haya habido un error en la consulta
                client.query(sql, params, (err, result) => {
                    done()
                    if(err){
                        reject(err) // O se puede rechazar porque haya habido un error en la ejecución de la consulta
                    } else{
                        resolve(result.rows)
                    }
                })
        })
    })
}

module.exports = {
    consulta
}