// CommonJS
const express = require("express");
const cors = require("cors");
const database = require("better-sqlite3");
const validator = require("./validator");
const articleRouter = require("./routes/articles");
const authRouter = require("./routes/auth");

const { initDB, devblogDB } = require("./database/database");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
// Middleware for Form Data
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize the database
initDB();

app.get("/", (request, response) => {
  response.send("Nothing to see - go away!");
});

// ARTICLES
app.use("/articles", articleRouter);
// Auth
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
