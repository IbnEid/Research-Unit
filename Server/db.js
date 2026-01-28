const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        encrypt: false
    }
};

const poolPromise = sql.connect(config)
    .then(pool => {
        console.log("✅ Connected to SQL Server");
        return pool; // ⭐⭐ السطر المهم
    })
    .catch(err => {
        console.log("❌ DB Error:", err);
        throw err;
    });

module.exports = { sql, poolPromise };
