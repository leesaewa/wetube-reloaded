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

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    dropMenuCont.classList.toggle("open");
    loginBtn.classList.toggle("open");
    overlay.classList.toggle("open");
    body.style.overflow = "hidden";
    if (!loginBtn.classList.contains("open")) {
      body.style.overflow = "auto";
    }
  });
}
overlay.addEventListener("click", () => {
  dropMenuCont.classList.remove("open");
  loginBtn.classList.remove("open");
  overlay.classList.remove("open");
  body.style.overflow = "auto";
});

//
// file preview
//
function filePreview(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    //이미지가 로드되면 images에 덮어쓰기
    reader.onload = (e) => {
      const previewImage = document.getElementById("images");
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
// input file에 change 이벤트 부여
const fileImage = document.getElementById("avatar");
fileImage.addEventListener("change", (e) => {
  filePreview(e.target);
});
