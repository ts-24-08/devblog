// CommonJS
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

let articles = [
  {
    id: 1,
    title: "I ♥ Javascript",
    content: "This is the content of article 1",
    image: {
      src: "javascript.jpg",
      alt: "I love Javascript",
    },
    teaser: "This is the reason why I love Javascript!",
    date: "2021-01-01",
    author: "John Doe",
    tags: [
      {
        id: 1,
        name: "Design",
        bgColor: "#F9F5FF",
        textColor: "#6941C6",
      },
      {
        id: 2,
        name: "Research",
        bgColor: "#EEF4FF",
        textColor: "#3538CD",
      },
      {
        id: 3,
        name: "Presentation",
        bgColor: "#FDF2FA",
        textColor: "#C11574",
      },
    ],
  },
  {
    id: 2,
    title: "CSS is Awesome",
    content: "This is the content of article 2",
    image: {
      src: "love.jpg",
      alt: "Picture with Love",
    },
    teaser: "This is the reason why I love CSS!",
    date: "2021-01-02",
    author: "Jane Doe",
    tags: [
      {
        id: 1,
        name: "Design",
        bgColor: "#F9F5FF",
        textColor: "#6941C6",
      },
      {
        id: 2,
        name: "Research",
        bgColor: "#EEF4FF",
        textColor: "#3538CD",
      },
      {
        id: 3,
        name: "Presentation",
        bgColor: "#FDF2FA",
        textColor: "#C11574",
      },
    ],
  },
  {
    id: 3,
    title: "HTML is Cool",
    content: "This is the content of article 3",
    image: {
      src: "nodejs.jpg",
      alt: "Picture with code",
    },
    link: "article-details.html",
    teaser: "This is the reason why I love HTML!",
    date: "2021-01-03",
    author: "John Doe",
    tags: [
      {
        id: 1,
        name: "Design",
        bgColor: "#F9F5FF",
        textColor: "#6941C6",
      },
      {
        id: 2,
        name: "Research",
        bgColor: "#EEF4FF",
        textColor: "#3538CD",
      },
      {
        id: 3,
        name: "Presentation",
        bgColor: "#FDF2FA",
        textColor: "#C11574",
      },
    ],
  },
  {
    id: 4,
    title: "React is the Best",
    content: "This is the content of article 4",
    image: {
      src: "remote.jpg",
      alt: "View from window to a river",
    },
    link: "article-details.html",
    teaser: "This is the reason why I love React!",
    date: "2021-01-04",
    author: "Jane Doe",
    tags: [
      {
        id: 1,
        name: "Design",
        bgColor: "#F9F5FF",
        textColor: "#6941C6",
      },
      {
        id: 2,
        name: "Research",
        bgColor: "#EEF4FF",
        textColor: "#3538CD",
      },
      {
        id: 3,
        name: "Presentation",
        bgColor: "#FDF2FA",
        textColor: "#C11574",
      },
    ],
  },
];
app.get("/", (request, response) => {
  response.send("Nothing to see - go away!");
});

app.get("/articles", (request, response) => {
  response.json(articles);
});

app.get("/articles/:id", (request, response) => {
  const id = parseInt(request.params.id);
  if (!id) {
    response.status(404).send("Article not found");
    return;
  }
  const article = articles.find((article) => article.id === id);
  if (!article) {
    response.status(404).send("Article not found");
    return;
  }
  console.log("Requst Params ID", id);
  response.json(article);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
