import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully!");
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.end();
  }
}

run();
