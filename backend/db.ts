const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "123postgres123",
    host: "localhost",
    port: 5432,
    database: "pewterdb"
})

module.exports=pool