const express = require("express");
const router = express.Router();
const devblogDB = require("../database/database");
const bcrypt = require("bcrypt");
const jsonwenbtoken = require("jsonwebtoken");

// localhost:3000/auth/register
router.post("/register", (request, response) => {
  const { username, password, passwordrepeat } = request.body;
  if (!username || !password) {
    response
      .status(400)
      .send({ message: "Username and password are required" });
    return;
  }

  if (password !== passwordrepeat) {
    response.status(400).send({ message: "Passwords do not match" });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const stmt = devblogDB.db.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
  );
  const insert = stmt.run(username, hashedPassword);

  response.status(200).send({ message: "User added successfully" });
});

// localhost:3000/auth/login
router.post("/login", (request, response) => {});

module.exports = router;
