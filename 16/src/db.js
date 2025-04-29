require('dotenv').config({ path: __dirname + '/../.env' })
const sql = require('mssql')

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

let pool

async function initializeDb() {
    try {
        pool = await sql.connect(dbConfig)
        console.log('Connected to MSSQL database')
        return pool
    } catch (err) {
        console.error('Database connection failed:', err)
        throw err
    }
}

async function getDb() {
    if (!pool) {
        throw new Error('Database connection not initialized. Call initializeDb first.')
    }
    return pool
}

async function closeDb() {
    if (pool) {
        await pool.close()
        pool = null
        console.log('Database connection closed')
    }
}

module.exports = {
    initializeDb,
    getDb,
    closeDb,
    sql
}

