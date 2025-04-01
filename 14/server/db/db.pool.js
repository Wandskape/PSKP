const sql = require("mssql");
const dbConfig = require("./db.config");

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

poolConnect.catch(err => {
  console.error('Database connection failed:', err);
});

module.exports = {
  pool,
  poolConnect
};