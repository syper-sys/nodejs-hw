import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT && 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.status(200).json({
    "message": "Retrieved all notes"
  });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    "message": `Retrieved note with ID: ${noteId}`
  });
});

app.get("/test-error", (req, res) => {
  throw new Error("Simulated server error");
});

app.use((req, res, next) => {
  res.status(404).json({
    "message": "Route not found"
  });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "There is some error. Please try again later" : err.message
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
