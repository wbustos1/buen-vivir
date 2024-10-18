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

document.addEventListener("scroll", onScroll_menuButtomBorder);
