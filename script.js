const documentsData = {
  "Мои документы": [
    { src: "id.jpeg", alt: "Удостоверение личности" },
    { src: "passport.jpeg", alt: "Паспорт" },
    { src: "driver.jpeg", alt: "Водительские права" },
  ],
  "Семья": [
    // сюда добавь документы семьи, если нужно
  ],
  "Другие документы": [],
};

const tabs = document.querySelectorAll(".tab");
const carousel = document.querySelector(".carousel");
const dotsContainer = document.querySelector(".dots");
const noDocs = document.querySelector(".no-docs");

let currentIndex = 0;
let documents = documentsData["Мои документы"]; // стартовая вкладка

function createSlide(doc) {
  const img = document.createElement("img");
  img.src = doc.src;
  img.alt = doc.alt;
  return img;
}

function getSlideWidth() {
  return carousel.querySelector("img").offsetWidth + 20; // margin 20
}

function getSlideOffset(index) {
  return getSlideWidth() * index;
}

function setupDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < documents.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i + 2; // учитываем клонированные слайды
      scrollToCurrent();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  let dotIndex = (currentIndex - 2 + documents.length) % documents.length;
  dots[dotIndex].classList.add("active");
}

function updateActiveSlide() {
  const slides = carousel.querySelectorAll("img");
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[currentIndex].classList.add("active");
  updateDots();
}

function scrollToCurrent() {
  carousel.scrollTo({ left: getSlideOffset(currentIndex), behavior: "smooth" });
  updateActiveSlide();
}

function setupCarousel() {
  carousel.innerHTML = "";

  if (documents.length === 0) {
    noDocs.style.display = "block";
    dotsContainer.style.display = "none";
    return;
  } else {
    noDocs.style.display = "none";
    dotsContainer.style.display = "block";
  }

  // клонируем последние 2 слайда в начало
  for (let i = documents.length - 2; i < documents.length; i++) {
    carousel.appendChild(createSlide(documents[i]));
  }

  // основные слайды
  documents.forEach((doc) => {
    carousel.appendChild(createSlide(doc));
  });

  // клонируем первые 2 слайда в конец
  for (let i = 0; i < 2; i++) {
    carousel.appendChild(createSlide(documents[i]));
  }

  currentIndex = 2;
  updateActiveSlide();

  carousel.scrollLeft = getSlideOffset(currentIndex);

  setupDots();
}

// бесконечная прокрутка
carousel.addEventListener("scroll", () => {
  const slideWidth = getSlideWidth();
  if (carousel.scrollLeft <= slideWidth * 0.5) {
    currentIndex += documents.length;
    carousel.scrollLeft += slideWidth * documents.length;
  } else if (carousel.scrollLeft >= slideWidth * (documents.length + 1.5)) {
    currentIndex -= documents.length;
    carousel.scrollLeft -= slideWidth * documents.length;
  } else {
    currentIndex = Math.round(carousel.scrollLeft / slideWidth);
  }
  updateActiveSlide();
});

// прокрутка колесом мыши
carousel.addEventListener("wheel", (e) => {
  e.preventDefault();
  carousel.scrollLeft += e.deltaY;
});

// переключение вкладок
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    documents = documentsData[tab.textContent];
    setupCarousel();
  });
});

setupCarousel();
