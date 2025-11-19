import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  const { name, process } = req.body;

  // Aqui você ainda vai implementar a automação Selenium depois
  res.json({ success: true, message: "Busca funcionando (placeholder)" });
});

export default router;
