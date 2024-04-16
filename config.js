import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'kilcart',
  waitForConnections: true, // Enable queueing
  connectionLimit: 100, // Set an appropriate limit
});

const connection = () => {
  return pool.getConnection();
};

export default connection;

