const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { nanoid } = require("nanoid");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "./urls.json"; // Temp DB
const urls = readUrls();

function readUrls() {
  if (!fs.existsSync(FILE_PATH)) return {};
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return data ? JSON.parse(data) : {};
}

function writeUrls(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

app.post("/shorten", (req, res) => {
  if (!req.body.longUrl) return res.status(400).json({ error: "Invalid URL" });

  const shortCode = nanoid(6);

  urls[shortCode] = req.body.longUrl;
  writeUrls(urls);

  res.status(200).json({ url: `http://localhost:8000/${shortCode}` });
});

app.get("/:shortenCode", (req, res) => {
  const shortCode = req.params.shortenCode;
  console.log(`Code is ${shortCode}`);
  res.redirect(urls[shortCode]);
});

app.listen(8000, () => console.log("Server running on port 8000"));
