import regeneratorRuntime from "regenerator-runtime";
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
const loginBtn = document.querySelector(".login");
const dropMenuCont = document.querySelector(".drop-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

loginBtn.addEventListener("click", () => {
  dropMenuCont.classList.toggle("open");
  loginBtn.classList.toggle("open");
  overlay.classList.toggle("open");
  body.style.overflow = "hidden";
  if (!loginBtn.classList.contains("open")) {
    body.style.overflow = "auto";
  }
});
overlay.addEventListener("click", () => {
  dropMenuCont.classList.remove("open");
  loginBtn.classList.remove("open");
  overlay.classList.remove("open");
  body.style.overflow = "auto";
});
