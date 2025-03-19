const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const { nanoid } = require("nanoid");
const { createClient } = require("@libsql/client");
require("dotenv").config();

const app = express();
const FILE_PATH = "./urls.json"; // Temp DB
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initializeDB() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS urls (
      id TEXT PRIMARY KEY,
      longUrl TEXT NOT NULL
    )
  `);
}

initializeDB();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

// TODO: Add middleware to check for URL validity and implement Turso

app.post("/shorten", async (req, res) => {
  console.log("Test from post");
  if (!req.body.longUrl) return res.status(400).json({ error: "Invalid URL" });

  const shortCode = nanoid(6);

  // TODO: Add checker to check for duplicated links, send back existing shortCode if long link already exists

  await turso.execute({
    sql: "INSERT INTO urls (id, longUrl) VALUES (?, ?)",
    args: [shortCode, req.body.longUrl],
  });

  res.status(200).json({ url: `http://localhost:8000/${shortCode}` });
});

app.get("/:shortenCode", async (req, res) => {
  console.log("Test from redirect");
  const shortCode = req.params.shortenCode;

  const result = await turso.execute({
    sql: "SELECT longUrl FROM urls WHERE id = ?",
    args: [shortCode],
  });

  if (result.rows.length > 0) return res.redirect(result.rows[0].longUrl);

  res.status(404).json({ error: "Short URL not found!" });
});

app.listen(8000, () => console.log("Server running on port 8000"));
