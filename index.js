import { IMG_DIR, IMG_NAMES, TEXT_CARRUSEL } from "./constants.js";

const $ = (selector) => document.querySelector(selector);

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

const showNextElement = (elements, invisibleClass, visibleClass, idx) => {
  const prevIdx = idx.curr === 0 ? elements.length - 1 : idx.curr - 1;

  elements[prevIdx].className = invisibleClass;
  elements[idx.curr].className = visibleClass;

  idx.curr = idx.curr === elements.length - 1 ? 0 : idx.curr + 1;
};

const changeElementsClassNameBySecond = (
  elements,
  className,
  seconds,
  index,
) => {
  if (index >= elements.length) {
    return;
  }

  setTimeout(() => {
    elements[index].className = className;
    changeElementsClassNameBySecond(elements, className, seconds, index + 1);
  }, seconds * 1000);
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

  const currentIdx = { curr: 0 };
  const showNext = () =>
    showNextElement(imgElements, "invisible", "", currentIdx);
  showNext();
  setInterval(showNext, 1000 * transitionSeconds);
};

const createCarruselCards = (carruselCardContentMatrix, transitionSeconds) => {
  const carruselDiv = $("#carrusel");
  const invisibleContainerClassName =
    "carrusel-card-container invisible-card-container";
  const normalContainerClassName = "carrusel-card-container";

  const invisibleCardClassName = "carrusel-card invisible-card";
  const normalCardClassName = "carrusel-card";

  // LIST OF CARD CONTAINER ELEMENTS TO MANIPULATE
  const cardContainerDivs = [];
  carruselCardContentMatrix.forEach((cardContentArray) => {
    // CREATE CARD CONTAINER
    const cardContainerDiv = document.createElement("div");
    cardContainerDiv.className = invisibleContainerClassName;

    cardContentArray.forEach((cardContent) => {
      // CARD DIV
      const cardDiv = document.createElement("div");
      cardDiv.className = invisibleCardClassName;

      // CARD TITLE
      const titleElement = document.createElement("h1");
      titleElement.textContent = cardContent.title;
      // CARD CONTENT
      const contentElement = document.createElement("span");
      contentElement.textContent = cardContent.content;
      // ADD ELEMENTS TO THE CARD
      cardDiv.appendChild(titleElement);
      cardDiv.appendChild(contentElement);

      // ADD CARD TO THE CONTAINER
      cardContainerDiv.appendChild(cardDiv);
    });

    // ADD CARD CONTAINER INTO #carrusel DIV
    carruselDiv.appendChild(cardContainerDiv);

    // ADD THE CARD ELEMENTS AND CARD CONTAINER ELEMENTS
    cardContainerDivs.push(cardContainerDiv);
  });

  // DYNAMIC INDEX
  const currentIdx = { curr: 0 };

  // SECONDS DEFINITION
  const secondsToTransitEach = 0.5;
  const secondsDelayToDissapearAll =
    transitionSeconds -
    cardContainerDivs[currentIdx.curr].children.length *
      secondsToTransitEach *
      2; // Is 2 because count when all elements appear/dissapear

  // FUNCTION TO SHOW NEXT CONTAINER
  const showNext = () => {
    const currentChildrens = Object.values(
      cardContainerDivs[currentIdx.curr].children,
    );

    showNextElement(
      cardContainerDivs,
      invisibleContainerClassName,
      normalContainerClassName,
      currentIdx,
    );

    // Show All the Cards
    changeElementsClassNameBySecond(
      currentChildrens,
      normalCardClassName,
      secondsToTransitEach,
      0,
    );

    // DISSAPEAR ALL THE CARDS
    setTimeout(() => {
      changeElementsClassNameBySecond(
        currentChildrens,
        invisibleCardClassName,
        secondsToTransitEach,
        0,
      );
    }, secondsDelayToDissapearAll * 1000);
  };

  // FIRST EXECUTION TO SHOW NEXT CONTAINER
  showNext();
  setInterval(showNext, 1000 * transitionSeconds);
};

document.addEventListener("scroll", onScroll_menuButtomBorder);
document.addEventListener("DOMContentLoaded", () => {
  createCarrusel(IMG_DIR, IMG_NAMES, 5);
  createCarruselCards(TEXT_CARRUSEL, 15);
});
