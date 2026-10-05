const express = require('express')
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const app = express()

app.get('/healthz', (_req, res) => res.send('ok'))

app.get('/', async (_req, res) => {
  try {
    await pool.query('INSERT INTO visits DEFAULT VALUES')
    const { rows: [count] } = await pool.query('SELECT count(*)::int AS visits FROM visits')
    const { rows: [version] } = await pool.query('SELECT version()')
    res.json({ visits: count.visits, database: version.version })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const port = process.env.PORT || 3000
app.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`listening on ${port}`))
