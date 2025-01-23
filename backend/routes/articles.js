const express = require("express");
const router = express.Router();
const devblogDB = require("../database/database");

// localhost:3000/articles
router.get("/", (request, response) => {
  //const articles = devblogDB.prepare("SELECT * FROM articles").all();
  const stmnt = devblogDB.db.prepare("SELECT * FROM articles");
  const articles = stmnt.all();
  response.json(articles);
});

// localhost:3000/articles/1
router.get("/:id", (request, response) => {});

router.post("/articles", (request, response) => {
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

  const stmt = devblogDB.db.prepare(
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

router.put("/articles/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { title, content, teaser, date, author, imagepath, imagealt, tags } =
    request.body;
  const articleExits = devblogDB.db
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
  const stmt = devblogDB.db.prepare(
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
router.delete("/:id", (request, response) => {});

module.exports = router;
