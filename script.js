const documentsData = {
  "Мои документы": [
    { src: "id.jpeg", alt: "Удостоверение личности" },
    { src: "passport.jpeg", alt: "Паспорт" },
    { src: "driver.jpeg", alt: "Водительские права" },
  ],
  "Семья": [],
  "Другие документы": [],
};

const tabs = document.querySelectorAll(".tab");
const carousel = document.querySelector(".carousel");
const dotsContainer = document.querySelector(".dots");
const noDocs = document.querySelector(".no-docs");

let currentIndex = 0;
let documents = documentsData["Мои документы"];

function renderCarousel() {
  carousel.innerHTML = "";
  dotsContainer.innerHTML = "";

  if (documents.length === 0) {
    noDocs.style.display = "block";
    return;
  } else {
    noDocs.style.display = "none";
  }

  documents.forEach((doc, index) => {
    const img = document.createElement("img");
    img.src = doc.src;
    img.alt = doc.alt;
    img.addEventListener("click", () => {
      currentIndex = index;
      updateActiveSlide();
      scrollToCurrent();
    });
    carousel.appendChild(img);

    // Создаём точки
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateActiveSlide();
      scrollToCurrent();
    });
    dotsContainer.appendChild(dot);
  });

  updateActiveSlide();
  scrollToCurrent();
}

function updateActiveSlide() {
  const images = carousel.querySelectorAll("img");
  const dots = dotsContainer.querySelectorAll(".dot");

  images.forEach((img, idx) => {
    img.classList.toggle("active", idx === currentIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}

function scrollToCurrent() {
  const slide = carousel.querySelectorAll("img")[currentIndex];
  slide.scrollIntoView({ behavior: "smooth", inline: "center" });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    documents = documentsData[tab.textContent];
    currentIndex = 0;
    renderCarousel();
  });
});

renderCarousel();
