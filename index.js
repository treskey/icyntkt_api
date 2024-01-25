const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const db = new Pool({

});

app.use(express.json());

// Create a new fact
app.post('/facts', async (req, res) => {
  const { factText } = req.body;

  try {
    const result = await db.query('INSERT INTO facts (fact_text) VALUES ($1) RETURNING *', [factText]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all facts
app.get('/facts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM facts');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
