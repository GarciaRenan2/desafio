const express = require("express"),
  app = express(),
  cors = require("cors"),
  db = require("./database"),
  { atividadeRoutes } = require("../app/routes");

const corsOptions = {
  exposedHeaders: ["x-access-token"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

atividadeRoutes(app);

app.use("*", (req, res) => {
  res
    .status(404)
    .json({ message: `route ${req.originalUrl} does not exists!` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
