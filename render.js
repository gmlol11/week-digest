// === Загрузка и отображение контента из digest.json ===

const digestPath = window.location.pathname.replace(/\/$/, "") + "/digest.json";

fetch(digestPath)
  .then(res => res.json())
  .then(data => {
    const content = document.getElementById("content");
    content.innerHTML = "";

    data.forEach(block => {
      const section = document.createElement("div");
      section.className = "section";

      if (block.title) {
        section.innerHTML += `<h2>${block.title}</h2>`;
      }

      if (block.subtitle) {
        section.innerHTML += `<div class="subtitle">${block.subtitle}</div>`;
      }

      if (block.type === "image-block") {
        const imgs = block.images.map(src =>
          `<img src="assets/${src}" alt="мем" />`
        ).join("");
        section.innerHTML += `<div class="images">${imgs}</div>`;
      }

      if (block.type === "video-block") {
        const vids = block.videos.map(src =>
          `<video controls src="assets/${src}"></video>`
        ).join("");
        section.innerHTML += `<div class="videos">${vids}</div>`;
      }

      if (block.type === "link-block") {
        const links = block.links.map(l =>
          `<a href="${l.url}" target="_blank">${l.text}</a>`
        ).join("");
        section.innerHTML += `<div class="links">${links}</div>`;
      }

      content.appendChild(section);
    });
  })
  .catch(err => {
    document.getElementById("content").innerHTML = "<p>Ошибка загрузки данных.</p>";
    console.error("Ошибка при загрузке digest.json:", err);
  });
