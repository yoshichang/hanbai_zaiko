const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Hanbai_zaiko',
  password: 'zyxza6',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('接続エラー:', err);
  } else {
    console.log('接続成功！現在時刻:', res.rows[0].now);
  }
  pool.end();
});