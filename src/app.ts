import express from "express";
const app = express();

app.get("/", (_req, res) => {
  res.send("API Unexo is running successfully!");
});

export default app;
