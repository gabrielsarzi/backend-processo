import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import db from "./db.js";

// importar as rotas novas
import authRoutes from "./routes/auth.js";
import processRoutes from "./routes/process.js";

const app = express();
app.use(cors());
app.use(express.json());

// usar as novas rotas
app.use("/auth", authRoutes);
app.use("/process", processRoutes);

// rota simples
app.get('/', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// testar DB
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// listar items
app.get('/items', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, created_at FROM items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// criar item
app.post('/items', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });

  try {
    const result = await db.query(
      'INSERT INTO items (name) VALUES ($1) RETURNING id, name, created_at',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
