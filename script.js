const tabs = document.querySelectorAll('.tab');
const carousel = document.querySelector('.carousel');
const dotsContainer = document.querySelector('.dots');
const noDocs = document.querySelector('.no-docs');

const documentsData = {
  "Мои документы": [
    { src: "id.jpeg", alt: "Удостоверение личности" },
    { src: "passport.jpeg", alt: "Паспорт" },
    { src: "driver.jpeg", alt: "Права" }
  ],
  "Семья": [],
  "Другие документы": [],
};

let currentTab = "Мои документы";
let documents = documentsData[currentTab];
let currentIndex = 0;

function createSlide(doc) {
  const img = document.createElement("img");
  img.src = doc.src;
  img.alt = doc.alt;
  return img;
}

function getSlideWidth() {
  const slide = carousel.querySelector("img");
  return slide ? slide.offsetWidth + 20 : 0;
}

function getOffset(index) {
  return getSlideWidth() * index;
}

function renderCarousel() {
  carousel.innerHTML = "";
  if (documents.length === 0) {
    noDocs.style.display = "block";
    dotsContainer.style.display = "none";
    return;
  } else {
    noDocs.style.display = "none";
    dotsContainer.style.display = "block";
  }

  for (let i = documents.length - 2; i < documents.length; i++) {
    const img = createSlide(documents[i]);
    carousel.appendChild(img);
  }

  documents.forEach(doc => {
    const img = createSlide(doc);
    carousel.appendChild(img);
  });

  for (let i = 0; i < 2; i++) {
    const img = createSlide(documents[i]);
    carousel.appendChild(img);
  }

  currentIndex = 2;
  carousel.scrollLeft = getOffset(currentIndex);
  updateActive();
  renderDots();
}

function updateActive() {
  const slides = carousel.querySelectorAll("img");
  slides.forEach(slide => slide.classList.remove("active"));
  slides[currentIndex].classList.add("active");
  updateDots();
}

function renderDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < documents.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i + 2;
      carousel.scrollTo({ left: getOffset(currentIndex), behavior: "smooth" });
      updateActive();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  const index = (currentIndex - 2 + documents.length) % documents.length;
  dots[index].classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentTab = tab.textContent;
    documents = documentsData[currentTab];
    renderCarousel();
  });
});

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
  updateActive();
});

carousel.addEventListener("wheel", (e) => {
  e.preventDefault();
  carousel.scrollLeft += e.deltaY;
});

renderCarousel();
