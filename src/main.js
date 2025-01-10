import { articles } from "./articles.js";

const container = document.querySelector("#container");
container.innerHTML = "";

articles.forEach((article, index) => {
  const articleWrapper = document.createElement("div");
  articleWrapper.classList.add("border", "shadow-md");
  const articleHref = document.createElement("a");
  articleHref.href = `article-details.html?id=${article.id}`;

  const articleImage = document.createElement("img");
  articleImage.src = article.image.src;
  articleImage.alt = article.image.alt;
  articleImage.classList.add("object-cover", "w-full", "h-80");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("p-4");

  switch (index) {
    case 0:
      articleWrapper.classList.add("lg:row-span-2");
      break;
    case 1:
      articleHref.classList.add("md:flex");
      articleImage.classList.add("lg:h-40", "lg:w-40");
      contentContainer.classList.add("overflow-hidden");
      break;
    case 2:
      articleHref.classList.add("md:flex");
      articleImage.classList.add("lg:h-40", "lg:w-40");
      contentContainer.classList.add("overflow-hidden");
      break;
    case 3:
      articleWrapper.classList.add("lg:col-span-2", "lg:w-full");
      break;
  }

  contentContainer.innerHTML = `
                <span class="text-sm font-semibold text-[#6941C6]">${
                  article.author
                } - ${article.date}</span>
                <h1 class="text-xl font-bold mt-4">${article.title}</h1>
                <p class="mt-4">${article.teaser}</p>
                <ul class="flex gap-2 mt-4">
                <!-- DRY Principle -->
                  ${article.tags
                    .map(
                      (tag) =>
                        `<li><span class="px-2 py-1 rounded text-sm mr-2 bg-[${tag.bgColor}] text-[${tag.textColor}]">${tag.name}</span></li>`
                    )
                    .join("")}
                  </ul>`;

  articleHref.appendChild(articleImage);
  articleHref.appendChild(contentContainer);
  articleWrapper.appendChild(articleHref);
  container.appendChild(articleWrapper);
});
