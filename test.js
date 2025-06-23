const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://photo-edit_owner:npg_CXWterY08UgS@ep-blue-mountain-a1sgdqyx-pooler.ap-southeast-1.aws.neon.tech/photo-edit?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("Connection failed:", err);
  else console.log("Connected successfully:", res.rows[0]);
  pool.end();
});
