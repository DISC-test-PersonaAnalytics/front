const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const databaseDir = path.join(__dirname, "..", "database");
const databasePath = path.join(databaseDir, "database.db");

fs.mkdirSync(databaseDir, { recursive: true });

const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("No se pudo conectar con SQLite:", error.message);
    return;
  }

  db.run("PRAGMA foreign_keys = ON");
});

module.exports = db;
