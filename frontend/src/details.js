// import { articles } from "./articles.js";

let params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");

const response = await fetch(import.meta.env.VITE_API_URL + "/"+ id);
const article = await response.json();
// let article = articles.find((article) => article.id == id);
console.log(article);

const header = document.querySelector("#headline");
header.innerText = article.title;

const image = document.querySelector("#image");
image.src = article.image.src;
image.alt = article.image.alt;

const description = document.querySelector("#teaser");
description.innerText = article.teaser;

const content = document.querySelector("#content");
content.innerText = article.content;
