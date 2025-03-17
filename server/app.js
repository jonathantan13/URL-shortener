const express = require("express");
const fs = require("fs");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());

const FILE_PATH = "urls.json"; // Temp DB
