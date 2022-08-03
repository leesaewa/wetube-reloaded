import regeneratorRuntime from "regenerator-runtime";
import "../scss/style.scss";

//
// loading

const loader = document.querySelector(".loading");
const body = document.querySelector("body");

body.style.overflow = "hidden"; //로딩 중 스크롤 방지
window.addEventListener("load", () => {
  setTimeout(() => {
    //로딩속도 구현
    loader.style.opacity = "0";
    body.style.overflow = "auto"; //스크롤 방지 해제
    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }, 2000);
});

//header
let headerScroll = document.querySelector("header");
let headerHeight = headerScroll.offsetHeight;

document.onscroll = function () {
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
if (fileImage) {
  fileImage.addEventListener("change", (e) => {
    filePreview(e.target);
  });
}
