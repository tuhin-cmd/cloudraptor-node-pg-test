// Release command: applies the schema before a release goes live.
const { Client } = require('pg')

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  await client.query(`CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`)
  console.log('migrations applied')
  await client.end()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
