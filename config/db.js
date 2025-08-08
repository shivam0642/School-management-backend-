const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to Railway MySQL');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      );
    `);

    console.log('Table "schools" is ready');
    connection.release();
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  pool,
};
