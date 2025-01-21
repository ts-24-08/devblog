// CommonJS
const express = require("express");
const cors = require("cors");
const database = require("better-sqlite3");
const validator = require("./validator");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
// Middleware for Form Data
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
const db = new database("devblog.db", { verbose: console.log });

// Create Table
db.prepare(
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
  tags TEXT)
  `
).run();

app.get("/", (request, response) => {
  response.send("Nothing to see - go away!");
});

// ARTICLES

app.get("/articles", (request, response) => {
  const articles = db.prepare("SELECT * FROM articles").all();
  response.json(articles);
});

app.delete("/articles/:id", (request, response) => {});

app.post("/articles", (request, response) => {
  let message = "";
  console.log(request.body);

  const { title, content, teaser, date, author, imagepath, imagealt, tags } =
    request.body;

  let validatorResult = validator(
    title,
    content,
    teaser,
    date,
    author,
    imagepath,
    imagealt,
    tags
  );

  if (validatorResult.error) {
    response.status(400).send({ message: validatorResult.message });
    return;
  }

  const stmt = db.prepare(
    "INSERT INTO articles (title, content, teaser, date, author, imagepath, imagealt, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const insert = stmt.run(
    title,
    content,
    teaser,
    date,
    author,
    imagepath,
    imagealt,
    tags
  );
  console.log(insert);
  response.status(200).send({ message: "Article added successfully" });
});

app.put("/articles/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { title, content, teaser, date, author, imagepath, imagealt, tags } =
    request.body;
  const articleExits = db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .get(id);
  console.log(articleExits);
  // Early Return
  if (!articleExits) {
    response.status(404).send({ message: "Article not found" });
    return;
  }

  let validatorResult = validator(
    title,
    content,
    teaser,
    date,
    author,
    imagepath,
    imagealt,
    tags
  );

  if (validatorResult.error) {
    response.status(400).send({ message: validatorResult.message });
    return;
  }
  const stmt = db.prepare(
    "UPDATE articles SET title = ?, content = ?, teaser = ?, date = ?, author = ?, imagepath = ?, imagealt = ?, tags = ? WHERE id = ?"
  );
  const update = stmt.run(
    title,
    content,
    teaser,
    date,
    author,
    imagepath,
    imagealt,
    tags,
    id
  );
  response.send({ message: "Article updated successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
