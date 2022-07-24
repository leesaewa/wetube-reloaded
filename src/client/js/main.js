import "../scss/style.scss";

//header
let headerScroll = document.querySelector("header");
let headerHeight = headerScroll.offsetHeight;

window.onscroll = function () {
  let windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    headerScroll.classList.add("scroll");
  } else {
    headerScroll.classList.remove("scroll");
  }
};

// nav
const mobileNav = document.querySelector(".hamburger");
const navContents = document.querySelector("nav");

mobileNav.addEventListener("click", () => {
  navContents.classList.toggle("open");
  mobileNav.classList.toggle("open");
  // if (!navContents.classList.contains("open")) {
  //   headerScroll.style.paddingBottom = "2rem";
  // } else {
  //   headerScroll.style.paddingBottom = "0";
  // }
});
