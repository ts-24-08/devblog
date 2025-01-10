import { articles } from "./articles.js";

const container = document.querySelector("#container");
container.innerHTML = "";

articles.forEach((article, index) => {
  container.innerHTML += `
          <div class="border shadow-md">
            <a href="${article.link}">
              <img class="object-cover w-full h-80" src="${article.image.src}" alt="${article.image.alt}" />
              <div class="p-4">
                <span class="text-sm font-semibold text-[#6941C6]">${article.author} - ${article.date}</span>
                <h1 class="text-xl font-bold mt-4">${article.title}</h1>
                <p class="mt-4">${article.teaser}</p>
                <ul class="flex gap-2 mt-4">
                <!-- DRY Principle -->
                  ${article.tags.map(tag => `<li><span class="px-2 py-1 rounded text-sm mr-2 bg-[${tag.bgColor}] text-[${tag.textColor}]">${tag.name}</span></li>`).join("")}
                  </ul>
              </div>
            </a>
          </div>`;
  
  const borderDiv = container.querySelector("div.border");
  const link = container.querySelector("a");
  const img = container.querySelector("img");
  const pDiv = container.querySelector("div.p-4");
  if (index === 0) {
    borderDiv.classList.add("lg:row-span-2");
  } else if (index === 1 && index === 2) {
    link.classList.add("md:flex");
    img.classList.add("lg:size:40");
    pDiv.classList.add("overflow-hidden");
  } else if (index === 3) {
    borderDiv.classList.add("lg:col-span-2", "lg:w-full");
  };
});


