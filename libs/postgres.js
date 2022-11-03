import pg from "pg";
const { Client } = pg;

async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: "5432",
    user: "diego",
    password: "admin123",
    database: "tasking"
  });
  await client.connect();
  return client;
};

export default getConnection;
