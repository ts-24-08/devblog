const database = require("better-sqlite3");

const db = new database("devblog.db", { verbose: console.log });

function initDB() {
  db
    .prepare(
      `
    CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT, 
    content TEXT, 
    teaser TEXT,
    date TEXT,
    author TEXT,
    imagepath TEXT,
    imagealt TEXT,
    tags TEXT),
    `
    )
    .run();
}

module.exports = { initDB, db };
