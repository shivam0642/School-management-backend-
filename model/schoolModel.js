const { pool } = require('../config/db');

const addSchool = async (data) => {
  const fields = Object.keys(data);              
  const placeholders = fields.map(() => '?').join(', '); 
  const values = Object.values(data);               

  const query = `INSERT INTO schools (${fields.join(', ')}) VALUES (${placeholders})`;

  const [result] = await pool.query(query, values);

  return result.insertId;
};

const getSchoolsSortedByDistance = async (userLat, userLng) => {
  const [rows] = await pool.query(
    `SELECT *,
      (6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(?)) +
        sin(radians(?)) * sin(radians(latitude))
      )) AS distance
     FROM schools
     ORDER BY distance ASC`,
    [userLat, userLng, userLat]
  );

  return rows;
};

module.exports = { addSchool,getSchoolsSortedByDistance};

