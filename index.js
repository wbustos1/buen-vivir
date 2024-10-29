const $ = (selector) => document.querySelector(selector);

const IMG_DIR = "./Images/carrusel";
const IMG_NAMES = [
  "img1.png",
  "img2.png",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg",
  "img9.jpg",
  "img10.jpg",
];

const globalMenu_className = ".menu-global";
const globalMenu_scrollClass = "menu-global-scrolled";

const onScroll_menuButtomBorder = () => {
  const menu = $(globalMenu_className);
  if (window.scrollY > 0) {
    menu.classList.add(globalMenu_scrollClass);
  } else {
    menu.classList.remove(globalMenu_scrollClass);
  }
};

const createCarrusel = (imgDir, imgNameList, transitionSeconds) => {
  const carruselDiv = $("#carrusel");
  const imgElements = [];
  imgNameList.forEach((imgName) => {
    const img = document.createElement("img");
    img.src = `${imgDir}/${imgName}`;
    img.className = "invisible";
    imgElements.push(img);
    carruselDiv.appendChild(img);
  });

  let currentIdx = 0;

  const showNextImg = () => {
    const prevIdx = currentIdx === 0 ? imgNameList.length - 1 : currentIdx - 1;

    imgElements[prevIdx].className = "invisible";
    imgElements[currentIdx].className = "";

    currentIdx = currentIdx === imgNameList.length - 1 ? 0 : currentIdx + 1;
  };

  showNextImg();
  setInterval(showNextImg, 1000 * transitionSeconds);
};

document.addEventListener("scroll", onScroll_menuButtomBorder);
document.addEventListener("DOMContentLoaded", () => {
  createCarrusel(IMG_DIR, IMG_NAMES, 5);
});
